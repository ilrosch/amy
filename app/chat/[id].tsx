import SendIcon from '@/assets/icons/send-icon';
import ThemedText from '@/components/shared/ThemedText';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectUserID } from '@/lib/store/slices/auth';
import {
  addChatID,
  addMessagesStore,
  addMessageStore,
  clearMessages,
  selectAllMessages,
} from '@/lib/store/slices/messages';
import { addMessage } from '@/scripts/handlers/add-message';
import { getMessages } from '@/scripts/handlers/get-messages';
import { p2pManager } from '@/scripts/p2p';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as Crypto from 'expo-crypto';
import { v4 as uuidv4 } from 'uuid';

if (typeof global.crypto === 'undefined') {
  global.crypto = {
    getRandomValues: Crypto.getRandomValues,
  };
}

export type Message = {
  id: string;
  body: string;
  status: string;
  from_id: string;
  to_id: string;
  created_at: string;
};

export type MessageGroup = Record<string, Message[]>;

export default function Chat() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentID = useAppSelector(selectUserID);
  const { id: remoteID } = useLocalSearchParams<{ id: string }>();

  const messageListElement = useRef(null);
  const inputElement = useRef(null);
  useEffect(() => {
    inputElement?.current?.focus();
  }, []);

  const [textMessage, setTextMessage] = useState<string>('');
  const messagesData = useAppSelector(selectAllMessages);

  const messageGroups = messagesData.reduce<MessageGroup>((acc, message) => {
    const currentDate = new Date(message.created_at).toLocaleDateString();
    if (!acc[currentDate]) acc[currentDate] = [];
    acc[currentDate].push(message);
    return acc;
  }, {});

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

  const renderMessageGroup = ({ item }: { item: string }) => {
    return (
      <>
        <View>
          <ThemedText>{item}</ThemedText>
        </View>
        <FlatList data={messageGroups[item]} renderItem={renderMessage} style={{ gap: 8 }} inverted />
      </>
    );
  };

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessages = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newMessages = await getMessages(remoteID, page);
      if (newMessages?.length === 0) {
        setHasMore(false);
      } else {
        dispatch(addMessagesStore(newMessages));
        if (page === 1) setTimeout(() => messageListElement.current?.scrollToEnd({ animated: false }), 0);
        setPage(page + 1);
      }
    } catch (err) {
      console.log('Failed fetch message:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(addChatID(remoteID));
      fetchMessages();
    })();
    return () => dispatch(clearMessages());
  }, []);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const isNearTop = contentOffset.y < 50;
    if (isNearTop && hasMore && !loading) {
      fetchMessages();
    }
  };

  const renderMessage = ({ item }) => {
    const stylesMsg =
      item.from_id === remoteID
        ? { backgroundColor: '#ffffff' }
        : { backgroundColor: '#86A78833', alignSelf: 'flex-end' };
    return (
      <View style={[styles.msgBox, stylesMsg]}>
        <ThemedText style={{ textAlign: 'left' }}>{item.body}</ThemedText>
        <ThemedText
          size="s"
          style={{ textAlign: 'right' }}
        >{`${new Date(item.created_at).toLocaleDateString()} (${item.status})`}</ThemedText>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={{ flex: 1, gap: 12 }}
    >
      <FlatList
        ref={messageListElement}
        data={messagesData}
        renderItem={renderMessage}
        // onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.msgList}
        inverted
      />

      <View style={styles.form}>
        <TextInput
          ref={inputElement}
          value={textMessage}
          placeholder={t('chats.message')}
          onChangeText={setTextMessage}
          style={styles.input}
          placeholderTextColor={'#B3B3B3'}
        />
        <Pressable onPress={sendMessage} style={({ pressed }) => [styles.sendBtn, pressed && styles.sendBtnPressed]}>
          <SendIcon />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  msgList: {
    gap: 12,
    paddingHorizontal: 12,
  },

  msgBox: {
    minWidth: 120,
    maxWidth: 300,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  // message form
  form: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 1.0)',

    backgroundColor: '#FFFFFF',

    paddingVertical: 12,
    paddingHorizontal: 16,

    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#1E1E1E',
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#86A788',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnPressed: {
    backgroundColor: '#6a8f6dff',
  },
});
