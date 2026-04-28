import { store } from '@/src/lib/store';
import removeContactDB from '../../database/handlers/del-contact-db';
import { removeContact } from '@/src/lib/store/slices/contacts';

const removeContactHandler = async (id: string) => {
  try {
    await removeContactDB(id);
    store.dispatch(removeContact(id));
  } catch (err) {
    console.log('Failed add contact: ', err);
    throw err;
  }
};

export default removeContactHandler;
