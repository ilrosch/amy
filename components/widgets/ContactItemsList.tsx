import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ContactType } from '@/scripts/database/handlers/add-contact-db';
import { Colors } from '@/assets/tokens';

import ThemedText from '../shared/ThemedText';
import Avatar from '../shared/Avatar';

export type ContactItemsListType = {
  items: ContactType[];
  route: string;
  handler?: () => void;
  style?: Record<string, StyleProp<ViewStyle>>;
};

export default function ContactItemsList({ items, route, handler, style }: ContactItemsListType) {
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: ContactType }) => (
    <Pressable
      onPress={() => {
        if (handler) {
          handler();
        }
        router.push(`${route}/${item.id}`);
      }}
    >
      <View style={styles.item}>
        <Avatar name={item.name} styleBox={{ width: 55, height: 55 }} />
        <View style={styles.itemContent}>
          <ThemedText title={true} style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );

  const renderEmpty = () => <ThemedText>{t('info.noContacts')}</ThemedText>;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      style={styles.box}
      contentContainerStyle={[styles.contentBox, style?.contentBox]}
    />
  );
}
const styles = StyleSheet.create({
  box: {
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  contentBox: {
    padding: 12,
    gap: 12,
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
