import { StyleSheet } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectAllContacts } from '@/lib/store/slices/contacts';
import { closeModal } from '@/lib/store/slices/modals';

import ContactItemsList from './ContactItemsList';

export default function ContactsListByModal() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContacts);
  return <ContactItemsList route={'chat'} handler={() => dispatch(closeModal())} items={contacts} style={styles} />;
}

const styles = StyleSheet.create({
  contentBox: {
    paddingHorizontal: 0,
  },
});
