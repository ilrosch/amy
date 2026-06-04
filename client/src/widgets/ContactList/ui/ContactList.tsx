import { useAppSelector } from '@/app-root/store';
import { selectAllContacts } from '@/entities/contact';
import { ContactCard } from '@/entities/contact/ui/ContactCard';
import { Search } from '@/shared/ui/blocks/Search';
import { Txt } from '@/shared/ui/texts/Txt';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');

  const allContacts = useAppSelector(selectAllContacts);

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
        ListEmptyComponent={<Txt>{t('empty')}</Txt>}
        scrollEnabled={isScrollEnabled}
      />
    </View>
  );
}
