import { Contact } from '@/src/assets/entities/contact';
import { getContactsDB } from '../../database/handlers/contact/get-all';
import { store } from '@/src/lib/store';
import { addContactsStore } from '@/src/lib/store/slices/contacts';

export const prepareContactsData = async () => {
  try {
    const contacts: Contact[] = await getContactsDB();
    store.dispatch(addContactsStore(contacts));
  } catch (err) {
    console.error('failed prepare contacts data:', err);
  }
};
