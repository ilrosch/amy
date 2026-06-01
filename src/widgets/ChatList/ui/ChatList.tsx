import { useAppSelector } from '@/app-root/store';
import { ChatItem, selectAllChats } from '@/entities/Chat';
import { ROUTES } from '@/shared/config/routes';
import { Search } from '@/shared/ui/blocks/Search';
import { Txt } from '@/shared/ui/texts/Txt';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

export interface IChatList {
  isScrollEnabled?: boolean;
}

export default function ChatList({ isScrollEnabled = true }: IChatList) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const allChats = useAppSelector(selectAllChats);

  const filtered = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return allChats.filter((c) => c.contactName?.toLowerCase().includes(lowerQuery));
  }, [allChats, searchQuery]);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleRouteChat = useCallback(
    (chatID: string) => {
      router.push(ROUTES.CHAT(chatID));
    },
    [router],
  );

  return (
    <View style={{ gap: 12 }}>
      {allChats.length > 5 && <Search onChange={onSearch} />}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} onPress={handleRouteChat} />}
        contentContainerStyle={{ gap: 4 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Txt>No chats</Txt>}
        scrollEnabled={isScrollEnabled}
      />
    </View>
  );
}
