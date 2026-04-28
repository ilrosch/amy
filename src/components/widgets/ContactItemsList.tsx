import { FlatList, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Colors } from '@/src/assets/tokens';

import ThemedText from '../shared/ThemedText';
import Avatar from '../shared/Avatar';
// import { handleRouterChat } from '@/src/scripts/handlers/router-chat';
import { ContactType } from '@/src/assets/entities/contact';
import { handleRouterChat } from '@/src/scripts/app/handlers/router-chat';

export type ContactItemsListType = {
  items: ContactType[];
  route?: string;
  handler?: () => void;
  scroll?: boolean;
  style?: Record<string, StyleProp<ViewStyle>>;
};

export default function ContactItemsList({ items, route, handler, style, scroll = true }: ContactItemsListType) {
  const { t } = useTranslation();
  const router = useRouter();

  const renderItem = ({ item }: { item: ContactType }) => (
    <Pressable
      onPress={() => {
        if (handler) {
          handler();
        }
        if (route) {
          router.push(`${route}/${item.id}`);
        } else {
          const 
        }
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
      style={[styles.box, style?.box]}
      contentContainerStyle={[styles.contentBox, style?.contentBox]}
      scrollEnabled={scroll}
    />
  );
}
const styles = StyleSheet.create({
  box: {
    flexGrow: 1,
    borderRadius: 26,
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
