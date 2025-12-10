import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { openModal } from '@/lib/store/slices/modals';
import { selectAllContacts } from '@/lib/store/slices/contacts';
import handleCopyID from '@/scripts/handleCopyID';

import AddUserIcon from '@/assets/icons/add-user-icon';
import CopyIcon from '@/assets/icons/copy-icon';

import BtnActionIconBox from '@/components/action/BtnActionIconBox';
import ContactItemsList from '@/components/widgets/ContactItemsList';

export default function Contacts() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContacts);

  return (
    <View style={styles.container}>
      <BtnActionIconBox
        btnData={[
          {
            Icon: AddUserIcon,
            title: t('actions.add-user'),
            handle: () => dispatch(openModal({ name: 'add-contact' })),
          },
          {
            Icon: CopyIcon,
            title: t('actions.copy'),
            handle: handleCopyID(),
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
