import { Message } from '@/src/assets/entities/message';
import { currentLng, i18nextInstance } from '@/src/lib/i18n';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks';
import {
  addChatID,
  addMessagesStore,
  clearMessages,
  prependMessages,
  selectAllMessages,
} from '@/src/lib/store/slices/messages';
import { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import MessageGroup from './MessageGroup';
import { showToast } from '@/src/scripts/toast';
import { getMessagesDB } from '@/src/scripts/database/handlers/message/get';

export type MessageListType = {
  currentID: string;
  peerID: string;
  chatID: string;
};

export default function MessagesList({ currentID, peerID, chatID }: MessageListType) {
  const dispatch = useAppDispatch();
  const boxElement = useRef(null);

  // set active chat and clear after close
  useEffect(() => {
    (async () => {
      dispatch(addChatID(chatID));
    })();

    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, chatID]);

  // fetch messages
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessages = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const items = await getMessagesDB(chatID, page, 20);
      if (items.length < 10) setHasMore(false);
      dispatch(addMessagesStore(items));
      if (page === 1) boxElement.current?.scrollToEnd();
      setPage((prev) => prev + 1);
    } catch (err) {
      showToast({ type: 'error', text1: 'errors.error', text2: err });
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (hasMore && !loading) {
      fetchMessages();
    }
  };

  const messages = useAppSelector(selectAllMessages);
  console.log('Messages:', messages);
  const groups = groupMessagesByDate(
    messages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
  );

  const renderItem: ListRenderItem<[string, Message[]]> = ({ item: [date, msgs] }) => (
    <MessageGroup date={date} messages={msgs} />
  );

  return (
    <FlatList
      ref={boxElement}
      data={groups}
      keyExtractor={([date]) => date}
      renderItem={renderItem}
      onEndReached={handleScroll}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 72 }}
      inverted
    />
  );
}

const formatChatDate = (d: string): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const date = new Date(d);
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (today.getDate() === messageDate.getDate()) return i18nextInstance.t('Сегодня');

  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  if (yesterday.getDate() === messageDate.getDate()) return i18nextInstance.t('Вчера');

  const format = currentLng as string;
  const oneWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  if (oneWeek <= messageDate) {
    return new Intl.DateTimeFormat(format, { weekday: 'long' }).format(date);
  }

  if (now.getFullYear() === messageDate.getFullYear()) {
    return new Intl.DateTimeFormat(format, { day: 'numeric', month: 'long' }).format(date);
  }

  return new Intl.DateTimeFormat(format, { day: 'numeric', month: 'long', year: 'numeric' }).format(
    date,
  );
};

const groupMessagesByDate = (messages: Message[]): [string, Message[]][] => {
  const groups = messages.reduce<Record<string, Message[]>>((acc, message) => {
    const date = formatChatDate(message.created_at);
    if (!acc[date]) acc[date] = [];
    acc[date].push(message);
    return acc;
  }, {});
  return Object.entries(groups);
};
