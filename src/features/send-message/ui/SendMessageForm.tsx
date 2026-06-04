import { Input } from '@/shared/ui/texts/Input';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/shared/config/theme';
import SendIcon from '@/assets/icons/send';
import { Message, setMessage } from '@/entities/peer-chat';
import { useAppDispatch, useAppSelector } from '@/app-root/store';
import { useChatManager } from '@/app-root/providers/SocketProvider/SocketProvider';
import { v7 } from 'uuid';
import { selectUserID } from '@/entities/user';

import * as Crypto from 'expo-crypto';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContactStatus, selectContactByID } from '@/entities/contact';

if (typeof global.crypto === 'undefined') {
  global.crypto = {
    getRandomValues: Crypto.getRandomValues,
  };
}

export type SendMessageFormType = {
  chatID: string;
  contactID: string;
};

export default function SendMessageForm({ chatID, contactID }: SendMessageFormType) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('sendMessageFeather');
  const [msg, setMsg] = useState<string>('');
  const userID = useAppSelector(selectUserID) as string;
  const chatManager = useChatManager();
  const { bottom } = useSafeAreaInsets();
  const { status } = useAppSelector((s) => selectContactByID(s, contactID));
  const isAccepted = status === ContactStatus.ACCEPTED;

  const handleSubmit = useCallback(async () => {
    if (!msg.trim()) return;

    const message: Message = {
      id: v7(),
      chatID,
      userFrom: userID,
      userTo: contactID,
      content: msg.trim(),
      status: 'pending',
      createdAt: new Date().toUTCString(),
    };

    try {
      dispatch(setMessage(message));
      await chatManager.sendMessage(contactID, message);
      setMsg('');
    } catch (err) {
      console.error('failed to send message:', err);
      setMsg(message.content);
    }
  }, [chatID, chatManager, contactID, dispatch, msg, userID]);

  if (!isAccepted) return;

  return (
    <View style={[styles.box, { bottom: bottom }]}>
      <Input
        value={msg}
        onChangeText={setMsg}
        placeholder={t('placeholder')}
        allowClear={false}
        isMultiline
        numberOfLines={5}
        style={{ input: { backgroundColor: COLORS.white } }}
      />
      {msg.trim().length > 0 && (
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <SendIcon color={COLORS.textContrast} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    gap: 6,

    padding: 12,
    backgroundColor: 'transparent',
  },
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
});
