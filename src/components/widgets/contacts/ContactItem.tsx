import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Colors } from '@/src/assets/tokens';
import { ContactType } from '@/src/assets/entities/contact';

import Avatar from '@/src/components/shared/Avatar';
import ThemedText from '@/src/components/shared/ThemedText';

export default function ContactItem({ item, handle }: { item: ContactType; handle: () => void }) {
  const router = useRouter();

  return (
    <Pressable onPress={handle} style={({ pressed }) => [styles.item, pressed && { opacity: 0.8 }]}>
      <Avatar name={item.name} styleBox={{ width: 55, height: 55 }} />
      <View style={styles.itemContent}>
        <ThemedText title={true} style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </ThemedText>
      </View>
    </Pressable>
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
