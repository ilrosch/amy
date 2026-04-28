import http from '@/src/lib/clients/axios';
import { router } from '@/src/lib/routes';
import { store } from '@/src/lib/store';
import { updateContactStore } from '@/src/lib/store/slices/contacts';
import { updateStatusContact } from '@/src/scripts/database/handlers/contact/update';
import { StatusAccepted } from '@/src/assets/entities/contact';

export const acceptContact = async (id: string) => {
  try {
    await http.post(router.contact.accept(id));
    await updateStatusContact(id, StatusAccepted);
    store.dispatch(updateContactStore({ id, changes: { status: StatusAccepted } }));
  } catch (err) {
    console.error('failed accepted contact:', err);
  }
};
