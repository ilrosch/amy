import http from '@/src/lib/clients/axios';
import { router } from '@/src/lib/routes';
import { store } from '@/src/lib/store';
import { updateContactStore } from '@/src/lib/store/slices/contacts';
import { updateStatusContact } from '@/src/scripts/database/handlers/contact/update';
import { StatusRejected } from '@/src/assets/entities/contact';

export const rejectContact = async (id: string) => {
  try {
    await http.post(router.contact.reject(id));
    await updateStatusContact(id, StatusRejected);
    store.dispatch(updateContactStore({ id, changes: { status: StatusRejected } }));
  } catch (err) {
    console.error('failed rejected contact:', err);
  }
};
