import { useAppDispatch, useAppSelector } from '@/app-root/store';
import { FlatList } from 'react-native';
import { Txt } from '@/shared/ui/texts/Txt';
import { useCallback, useEffect, useState } from 'react';
import {
  cleanupMessages,
  getMessages,
  initMessages,
  MessageCard,
  MessageItem,
  selectMessages,
  setChatID,
  setMessage,
  setMessages,
  updateMessage,
} from '@/entities/peer-chat';
import { useChatManager } from '@/app-root/providers/SocketProvider/SocketProvider';
import { selectUserID } from '@/entities/User';
import { COLORS } from '@/shared/config/theme';

export type MessageListType = {
  chatID: string;
  contactID: string;
};

export default function MessageList({ chatID, contactID }: MessageListType) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const chatManager = useChatManager();
  const userID = useAppSelector(selectUserID);

  useEffect(() => {
    chatManager.setCallback({
      onMessage: async (msg) => {
        dispatch(setMessage(msg));
        await chatManager.onChangeStatus(contactID, {
          id: msg.id,
          chatID: msg.chatID,
          status: 'read',
          userFrom: msg.userTo,
          userTo: msg.userFrom,
        });
      },
      onStatusChange: (status) =>
        dispatch(updateMessage({ id: status.id, changes: { status: status.status } })),
    });
  }, [chatManager, dispatch]);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMoreMessage = useCallback(
    async (currentPage: number) => {
      if (loading || !hasMore) return;

      try {
        setLoading(true);
        const newMessages = await getMessages(chatID, currentPage);

        if (newMessages.length < 10) {
          setHasMore(false);
        }

        newMessages.forEach((msg) => {
          if (msg.userFrom === contactID && msg.status === 'new') {
            chatManager.onChangeStatus(contactID, {
              id: msg.id,
              chatID: msg.chatID,
              status: 'read',
              userFrom: msg.userFrom,
              userTo: msg.userTo,
            });
          }
        });

        dispatch(setMessages(newMessages));
        setPage((p) => p + 1);
      } catch (err) {
        console.error('failed to load message', err);
      } finally {
        setLoading(false);
      }
    },
    [chatID, chatManager, contactID, dispatch],
  );

  useEffect(() => {
    dispatch(setChatID(chatID));
    setPage(1);
    setHasMore(true);
    fetchMoreMessage(1);

    return () => {
      dispatch(cleanupMessages());
    };
  }, [chatID, dispatch]);

  const handleMoreMessage = () => {
    if (!loading && hasMore) {
      fetchMoreMessage(page);
    }
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MessageItem message={item} userID={userID} />}
      showsVerticalScrollIndicator={false}
      onEndReached={handleMoreMessage}
      onEndReachedThreshold={0.3}
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ gap: 6, padding: 12, paddingTop: 80 }}
      inverted
      removeClippedSubviews={true}
    />
  );
}
