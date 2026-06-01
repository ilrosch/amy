import { useAppSelector } from '@/app-root/store';
import { selectAllContacts } from '@/entities/Contact';
import { ContactCard } from '@/entities/Contact/ui/ContactCard';
import { Search } from '@/shared/ui/blocks/Search';
import { Txt } from '@/shared/ui/texts/Txt';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

export type ContactListType = {
  onPress: (id: string) => void;
  param?: 'id' | 'chatID';
  isScrollEnabled?: boolean;
};

export default function ContactList({
  onPress,
  param = 'id',
  isScrollEnabled = true,
}: ContactListType) {
  const [searchQuery, setSearchQuery] = useState('');

  const allContacts = useAppSelector(selectAllContacts).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const filtered = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return allContacts.filter((c) => c.name.toLowerCase().includes(lowerQuery));
  }, [allContacts, searchQuery]);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <View style={{ gap: 12 }}>
      {allContacts.length > 5 && <Search onChange={onSearch} />}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactCard contact={item} onPress={onPress} param={param} />}
        contentContainerStyle={{ gap: 4 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Txt>Нет контактов</Txt>}
        scrollEnabled={isScrollEnabled}
      />
    </View>
  );
}
