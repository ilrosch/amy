import { Pressable, StyleSheet, View } from 'react-native';
import Input from '../shared/Input';
import SendIcon from '@/src/assets/icons/send-icon';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Colors } from '@/src/assets/tokens';

// import { addMessageStore } from '@/src/lib/store/slices/messages';
// import { addMessage } from '@/src/scripts/handlers/add-message';
import { useAppDispatch } from '@/src/lib/store/hooks';

import * as Crypto from 'expo-crypto';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/src/assets/entities/message';
import { showToast } from '@/src/scripts/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chatManager } from '@/src/scripts/app/peer/init';

if (typeof global.crypto === 'undefined') {
  global.crypto = {
    getRandomValues: Crypto.getRandomValues,
  };
}

export default function ChatForm({ currentID, remoteID, chatID }: { currentID: string; remoteID: string; chatID: string }) {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const inputElement = useRef(null);

  const [textMessage, setTextMessage] = useState<string>('');

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const sendMessage = async () => {
    const messageBody = textMessage.trim();
    if (!messageBody) return;

    const message: Message = {
      id: uuidv4(),
      content: messageBody,
      user_from: currentID,
      user_to: remoteID,
      chat_id: chatID,
      created_at: new Date().toISOString(),
    };

    try {
      await chatManager.sendMessage(remoteID, message);
      setTextMessage('');
    } catch (err) {
      console.log('Failed send message:', err);
      showToast({ type: 'error', text1: 'Failed send message' });
    }
  };

  return (
    <View style={[styles.form, { paddingBottom: bottom + 12 }]}>
      <Input
        ref={inputElement}
        value={textMessage}
        setValue={setTextMessage}
        placeholder={t('chats.message')}
        style={{ input: { flex: 1, borderRadius: 30 } }}
        multiline
      />
      {textMessage.trim().length !== 0 && (
        <Pressable
          onPress={sendMessage}
          style={({ pressed }) => [styles.sendBtn, pressed && styles.sendBtnPressed]}
        >
          <SendIcon />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sendBtn: {
    width: 54,
    height: 54,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnPressed: {
    backgroundColor: Colors.primaryPressed,
  },
});
