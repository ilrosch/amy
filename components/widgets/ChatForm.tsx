import { Pressable, StyleSheet, View } from 'react-native';
import Input from '../shared/Input';
import SendIcon from '@/assets/icons/send-icon';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Colors } from '@/assets/tokens';
import { p2pManager } from '@/scripts/p2p';
import { addMessageStore } from '@/lib/store/slices/messages';
import { addMessage } from '@/scripts/handlers/add-message';
import { useAppDispatch } from '@/lib/store/hooks';

import * as Crypto from 'expo-crypto';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/assets/enttites/Message';

if (typeof global.crypto === 'undefined') {
  global.crypto = {
    getRandomValues: Crypto.getRandomValues,
  };
}

export default function ChatForm({ currentID, remoteID }: { currentID: string; remoteID: string }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const inputElement = useRef(null);

  const [textMessage, setTextMessage] = useState<string>('');

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const sendMessage = async () => {
    const messageBody = textMessage.trim();
    if (!messageBody) return;

    try {
      if (!p2pManager.dataChannels[remoteID]) {
        await p2pManager.initChat(remoteID);
      }

      const message: Message = {
        id: uuidv4(),
        body: messageBody,
        status: 'send',
        from_id: currentID,
        to_id: remoteID,
        created_at: new Date().toISOString(),
      };

      if (p2pManager.dataChannels[remoteID].readyState === 'connecting') {
        p2pManager.queue[remoteID] = [...(p2pManager.queue[remoteID] ?? []), JSON.stringify(message)];
      } else if (p2pManager.dataChannels[remoteID].readyState === 'open') {
        p2pManager.dataChannels[remoteID].send(JSON.stringify(message));
      }
      setTextMessage('');
      dispatch(addMessageStore(message));
      await addMessage({ ...message, chat_id: remoteID });
    } catch (err) {
      console.log('Failed send message:', err);
    }
  };

  return (
    <View style={styles.form}>
      <Input
        ref={inputElement}
        value={textMessage}
        setValue={setTextMessage}
        placeholder={t('chats.message')}
        style={{ input: { flex: 1 } }}
      />
      <Pressable onPress={sendMessage} style={({ pressed }) => [styles.sendBtn, pressed && styles.sendBtnPressed]}>
        <SendIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignSelf: 'flex-end',
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
