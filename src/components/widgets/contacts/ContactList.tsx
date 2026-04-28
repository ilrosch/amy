import { ContactType } from '@/src/assets/entities/contact';
import { appStyles } from '@/src/assets/tokens';
import InfoBadge from '@/src/components/shared/InfoBadge';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ContactItem from './ContactItem';
import { useRouter } from 'expo-router';

export default function ContactList({ items }: { items: ContactType[] }) {
  const { t } = useTranslation();
  const router = useRouter();

  if (items.length === 0) {
    return <InfoBadge name={t('info.noContacts')} />;
  }

  return (
    <View style={[styles.box, appStyles.boxS, appStyles.shadow]}>
      {items.map((item) => (
        <ContactItem key={item.id} item={item} handle={() => router.push(`profile/${item.id}`)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    gap: 6,
    marginBottom: 40,
    overflow: 'hidden',
  },
});
