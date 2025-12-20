import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/lib/store/hooks';
import { selectAllContacts } from '@/lib/store/slices/contacts';
import { handleCopyCurrentID } from '@/scripts/handleCopyID';

import AddUserIcon from '@/assets/icons/add-user-icon';
import CopyIcon from '@/assets/icons/copy-icon';

import BtnActionIconBox from '@/components/action/BtnActionIconBox';
import ContactItemsList from '@/components/widgets/ContactItemsList';
import { useRouter } from 'expo-router';

export default function Contacts() {
  const { t } = useTranslation();
  const router = useRouter();
  const contacts = useAppSelector(selectAllContacts).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <BtnActionIconBox
        btnData={[
          {
            Icon: AddUserIcon,
            title: t('actions.add-user'),
            handle: () => router.push('add-contact'),
          },
          {
            Icon: CopyIcon,
            title: t('actions.copy'),
            handle: handleCopyCurrentID,
          },
        ]}
      />
      <ContactItemsList items={contacts} route={'profile'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1,
    gap: 6,
  },
  contactBox: {
    paddingHorizontal: 12,
    marginBottom: 100,
  },
});
