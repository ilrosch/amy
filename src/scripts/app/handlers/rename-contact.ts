import { store } from '@/src/lib/store';
import { updateContactStore } from '@/src/lib/store/slices/contacts';
import { renameContactDB } from '../../database/handlers/contact/rename';

const renameContactHandler = async (id, name) => {
  const contact = { id, name };
  try {
    await renameContactDB(id, name);
    store.dispatch(updateContactStore({ id, changes: contact }));
  } catch (err) {
    console.log('Failed add contact: ', err);
    throw err;
  }
};

export default renameContactHandler;
