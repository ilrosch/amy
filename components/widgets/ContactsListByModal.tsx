import { StyleSheet } from 'react-native';

import { useAppSelector } from '@/lib/store/hooks';
import { selectAllContacts } from '@/lib/store/slices/contacts';

import ContactItemsList from './ContactItemsList';

export default function ContactsListByModal() {
  const contacts = useAppSelector(selectAllContacts);
  return <ContactItemsList route={'chat'} items={contacts} style={styles} />;
}

const styles = StyleSheet.create({
  contentBox: {
    paddingHorizontal: 0,
  },
});
