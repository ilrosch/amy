import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import ThemedText from '../shared/ThemedText';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/assets/tokens';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addChatID,
  addMessagesStore,
  clearMessages,
  prependMessages,
  selectAllMessages,
} from '@/lib/store/slices/messages';
import { getMessages } from '@/scripts/handlers/get-messages';
import { Message } from '@/assets/enttites/Message';

export default function MessagesList({ currentID, remoteID }: { currentID: string; remoteID: string }) {
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
      const items = await getMessages(remoteID, page);

      if (!items || items.length === 0) {
        setHasMore(false);
        return;
      }

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

  const messagesData = useAppSelector(selectAllMessages);

  const groups = messagesData.reduce<Record<string, Message[]>>((acc, item) => {
    const date = new Date(item.created_at).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const renderMessage = (message: Message) => {
    const time = new Date(message.created_at).toLocaleTimeString();
    const stylesMsg: StyleProp<ViewStyle> =
      message.from_id === currentID
        ? { backgroundColor: '#86A78833', alignSelf: 'flex-end' }
        : { backgroundColor: '#ffffff', alignSelf: 'flex-start' };
    return (
      <View style={[styles.messageItem, stylesMsg]}>
        <ThemedText style={{ textAlign: 'left' }}>{message.body}</ThemedText>
        <ThemedText
          size="xs"
          style={{ textAlign: 'right' }}
        >{`${time.slice(0, time.length - 3)} (${message.status})`}</ThemedText>
      </View>
    );
  };

  const renderGroupMessage = ({ item: [date, messages] }) => (
    <View style={styles.messageGroup}>
      <ThemedText title={true} size={'s'} style={styles.messageDate}>
        {date}
      </ThemedText>
      <View style={styles.messageList}>
        {messages.map((message) => (
          <View key={message.id}>{renderMessage(message)}</View>
        ))}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={{ transform: [{ scaleY: -1 }, { scaleX: -1 }] }}>
      <ThemedText>{t('info.empty-chat')}</ThemedText>
    </View>
  );

  return (
    <FlatList
      ref={messageListElement}
      data={Object.entries(groups)}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderGroupMessage}
      ListEmptyComponent={renderEmpty}
      onEndReached={handleScroll}
      onEndReachedThreshold={0.5}
      style={{ marginHorizontal: -12 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 24, paddingVertical: 12 }}
      inverted
    />
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
    maxWidth: 400,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
