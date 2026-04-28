import { store } from '@/src/lib/store';
import { addContact } from '@/src/lib/store/slices/contacts';
import addContactDB, { ContactType } from '@/src/scripts/database/handlers/add-contact-db';

const handleSocketAddContact = async (contact: ContactType) => {
  try {
    await addContactDB(contact);
    store.dispatch(addContact(contact));
    console.log('success add contact socket: ', contact.id);
  } catch (err) {
    console.log('failed add contact socket: ', err);
  }
};

export default handleSocketAddContact;
