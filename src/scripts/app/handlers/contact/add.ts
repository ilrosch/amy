import { Contact } from '@/src/assets/entities/contact';
import http from '@/src/lib/clients/axios';
import { router } from '@/src/lib/routes';
import { store } from '@/src/lib/store';
import {
  addContactsStore,
  addContactStore,
  updateContactStore,
} from '@/src/lib/store/slices/contacts';
import { addContactDB, addContactsDB } from '@/src/scripts/database/handlers/contact/add';
import { errors } from '@/src/scripts/utils/errors';
import { isAxiosError } from 'axios';

export const addContact = async (id: string) => {
  try {
    const response = await http.post<Contact>(router.contact.new(id));
    await addContactDB(response.data);
    store.dispatch(addContactStore(response.data));
  } catch (err) {
    console.error('Failed add contact:', err);
    if (isAxiosError(err)) {
      if (err.request) throw errors.ERR_NETWORK;
    }
    throw errors.ERR_UNKNOWN;
  }
};

export const inviteContact = async (id: string) => {
  try {
    const response = await http.post<Contact>(router.contact.new(id));
    await addContactDB(response.data);
    store.dispatch(updateContactStore({ id, changes: response.data }));
  } catch (err) {
    console.error('Failed add contact:', err);
    if (isAxiosError(err)) {
      if (err.request) throw errors.ERR_NETWORK;
    }
    throw errors.ERR_UNKNOWN;
  }
};

// type AddContacts = (contacts: ContactType[]) => Promise<void>;

// export const addContacts: AddContacts = async (contacts) => {
//   try {
//     await addContactsDB(contacts);
//     store.dispatch(addContactsStore(contacts));
//     // need add notify
//   } catch (err) {
//     console.error('Failed add contact:', err);
//   }
// };
