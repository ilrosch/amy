import http from '@/src/lib/clients/axios';
import { router } from '@/src/lib/routes';
import { store } from '@/src/lib/store';
import { deleteContactStore } from '@/src/lib/store/slices/contacts';
import { deleteContactDB } from '@/src/scripts/database/handlers/contact/delete';

export const deleteContact = async (id: string) => {
  try {
    await http.post(router.contact.reject(id));
    await deleteContactDB(id);
    store.dispatch(deleteContactStore(id));
  } catch (err) {
    console.error('failed rejected contact:', err);
  }
};
