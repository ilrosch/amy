import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/src/assets/tokens';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks';
import {
  addChatID,
  addMessagesStore,
  clearMessages,
  prependMessages,
  selectAllMessages,
} from '@/src/lib/store/slices/messages';
// import { getMessages } from '@/src/scripts/handlers/get-messages';
import { Message } from '@/src/assets/entities/message';
import MessageItem from './chat/MessageItem';
import ThemedText from '../shared/ThemedText';
import { currentLng, i18nextInstance } from '@/src/lib/i18n';
import { ChatManager } from '@/src/scripts/peer-to-peer/chat';
import { getMessages } from '@/src/scripts/app/handlers/get-messages';

export default function MessagesList({
  currentID,
  remoteID,
  chatID,
}: {
  currentID: string;
  remoteID: string;
  chatID: string;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const messageListElement = useRef(null);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessages = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const items = await getMessages(chatID, page);

      if (!items || items.length === 0) {
        setHasMore(false);
        return;
      }

      // items.forEach(({ id, from_id, status }) => {
      //   from_id !== currentID &&
      //     status === 'delivered' &&
      //     ChatManager.sendStatus(from_id, id, 'read');
      // });

      if (page === 1) {
        dispatch(addMessagesStore(items.reverse() as Message[]));
      } else {
        dispatch(prependMessages(items as Message[]));
      }

      if (items.length < 10) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    } catch (err) {
      console.log('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (hasMore && !loading) {
      fetchMessages();
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(addChatID(remoteID));
    })();
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, remoteID]);

  const messages = useAppSelector(selectAllMessages);
  // const messages: Message[] = [
  //   // Сегодня — 24 декабря 2025
  //   {
  //     id: 'msg-1',
  //     body: 'Привет! Как дела?',
  //     chat_id: 'chat-123',
  //     from_id: currentID, // исходящее
  //     to_id: 'user-002',
  //     created_at: '2025-12-24T10:15:00Z',
  //     status: 'read',
  //   },
  //   {
  //     id: 'msg-2',
  //     body: 'Всё хорошо! Ты как?',
  //     chat_id: 'chat-123',
  //     from_id: 'user-002', // входящее
  //     to_id: currentID,
  //     created_at: '2025-12-24T10:18:00Z',
  //     status: 'sent', // статус обычно не важен для входящих, но может использоваться для sync
  //   },

  //   // Вчера
  //   {
  //     id: 'msg-3',
  //     body: 'Вчера забыл ответить — всё отлично!',
  //     chat_id: 'chat-123',
  //     from_id: 'user-002',
  //     to_id: currentID,
  //     created_at: '2025-12-23T18:30:00Z',
  //     status: 'delivered',
  //   },

  //   // На этой неделе
  //   {
  //     id: 'msg-4',
  //     body: 'Напомни, пожалуйста, насчёт звонка в WebRTC.',
  //     chat_id: 'chat-123',
  //     from_id: 'user-002',
  //     to_id: currentID,
  //     created_at: '2025-12-22T14:00:00Z',
  //     status: 'read',
  //   },

  //   // В этом году (но не на этой неделе)
  //   {
  //     id: 'msg-5',
  //     body: 'Да, в ноябре мы обсуждали шумоподавление.',
  //     chat_id: 'chat-123',
  //     from_id: currentID,
  //     to_id: 'user-002',
  //     created_at: '2025-11-10T14:25:00Z',
  //     status: 'read',
  //   },

  //   // Прошлый год
  //   {
  //     id: 'msg-6',
  //     body: 'Тогда мы только начинали чат-модуль',
  //     chat_id: 'chat-123',
  //     from_id: currentID,
  //     to_id: 'user-002',
  //     created_at: '2024-07-05T11:45:00Z',
  //     status: 'read',
  //   },

  //   // Раньше
  //   {
  //     id: 'msg-7',
  //     body: 'Первое сообщение в этом чате 😊',
  //     chat_id: 'chat-123',
  //     from_id: 'user-002',
  //     to_id: currentID,
  //     created_at: '2022-12-30T20:05:00Z',
  //     status: 'sent',
  //   },
  // ];

  const groups = groupMessagesByDate(messages);

  const renderItem: ListRenderItem<[string, Message[]]> = ({ item: [date, msgs] }) => (
    <MessageGroup date={date} messages={msgs} />
  );

  return (
    <>
      {loading && <ActivityIndicator size={'small'} style={{ alignSelf: 'center' }} />}
      <FlatList
        ref={messageListElement}
        data={groups}
        keyExtractor={(item) => item[0]}
        renderItem={renderItem}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, paddingHorizontal: 12, paddingTop: 72 }}
        inverted
      />
    </>
  );
}

const styles = StyleSheet.create({
  messageGroup: {
    gap: 12,
  },
  messageDate: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: Colors.white,
    color: Colors.titleDark,
  },
  messageList: {
    gap: 6,
  },
  messageItem: {
    flexShrink: 1,
    minWidth: 100,
    maxWidth: 300,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
