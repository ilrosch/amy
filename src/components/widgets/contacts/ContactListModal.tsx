import { ContactType } from '@/src/assets/entities/contact';
import InfoBadge from '@/src/components/shared/InfoBadge';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ContactItem from './ContactItem';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectAllChats } from '@/src/lib/store/slices/chats';
import { useRouter } from 'expo-router';
import { createChat } from '@/src/scripts/app/handlers/chat/create';

export default function ContactListModal({ items }: { items: ContactType[] }) {
  const { t } = useTranslation();
  const router = useRouter();
  const chats = useAppSelector(selectAllChats);

  if (items.length === 0) {
    return <InfoBadge name={t('info.noContacts')} />;
  }

  return (
    <View style={styles.box}>
      {items.map((item) => (
        <ContactItem
          key={item.id}
          item={item}
          handle={async () => {
            if (!chats.find(({ id }) => id === item.id)) await createChat(item.id);
            router.dismiss();
            router.push(`chat/${item.id}`);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    gap: 8,
    overflow: 'hidden',
  },
});
