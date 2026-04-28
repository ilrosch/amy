import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ChatType } from '@/src/assets/entities/chat';
import { Colors } from '@/src/assets/tokens';

import Avatar from '@/src/components/shared/Avatar';
import ThemedText from '@/src/components/shared/ThemedText';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectContactByChatID } from '@/src/lib/store/slices/contacts';

export default function ChatItem({ item }: { item: ChatType }) {
  const { t } = useTranslation();
  const router = useRouter();

  const contact = useAppSelector((s) => selectContactByChatID(s, item.id));

  return (
    <View style={styles.item}>
      <Pressable onPress={() => router.push(`/profile/${contact?.id}`)}>
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
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemContent: {
    padding: 12,
    flexShrink: 1,
    width: '100%',
    borderRadius: 2,
    borderBottomWidth: 2,
    borderBottomColor: Colors.bgLine,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  itemTitle: {
    textAlign: 'left',
  },
  itemText: {
    textAlign: 'left',
  },
});
