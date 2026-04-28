import axiosInstance from '@/src/lib/clients/axios';
import routes from '@/src/lib/routes';
import addContactDB from '../../database/handlers/add-contact-db';
import { store } from '@/src/lib/store';
import { addContact } from '@/src/lib/store/slices/contacts';

const addContactHandler = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(routes.addContact(id));
    await addContactDB(data);
    store.dispatch(addContact(data));
    console.log('success add contact: ', id);
  } catch (err) {
    console.log('failed add contact: ', err);
    throw err;
  }
};

export default addContactHandler;
