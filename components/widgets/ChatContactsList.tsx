import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Colors } from '@/assets/tokens';
import { ChatType } from '@/lib/store/slices/chats';

import Avatar from '../shared/Avatar';
import ThemedText from '../shared/ThemedText';

export type ChatContactsListType = {
  items: ChatType[];
};

export default function ChatContactsList({ items }: ChatContactsListType) {
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: ChatType }) => (
    <View style={styles.item}>
      <Pressable onPress={() => router.push(`/profile/${item.id}`)}>
        <Avatar name={item.name} styleBox={{ width: 55, height: 55 }} />
      </Pressable>
      <View style={styles.itemContent}>
        <Pressable onPress={() => router.push(`/chat/${item.id}`)}>
          <ThemedText title={true} style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </ThemedText>
          <ThemedText size={'s'} style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
            {item.message || t('info.empty-chat')}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );

  const renderEmpty = () => <ThemedText>{t('info.noChats')}</ThemedText>;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      style={styles.box}
      contentContainerStyle={styles.contentBox}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  contentBox: {
    padding: 12,
    gap: 6,
  },
  item: {
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemContent: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderBottomWidth: 1.5,
    borderBottomColor: '#eee',
    flexShrink: 1,
    overflow: 'hidden',
    width: '100%',
    padding: 12,
  },
  itemTitle: {
    textAlign: 'left',
    color: Colors.titleDark,
  },
  itemText: {
    textAlign: 'left',
    color: Colors.textDark,
  },
});
