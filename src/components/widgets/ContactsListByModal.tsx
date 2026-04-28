import { StyleSheet } from 'react-native';

import { useAppSelector } from '@/src/lib/store/hooks';
import { selectAllContacts } from '@/src/lib/store/slices/contacts';

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
