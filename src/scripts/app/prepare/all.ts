import { prepareUserData } from './user';
import { prepareContactsData } from './contact';
import initDB from '../../database/init';
import { prepareChatsData } from './chat';

export const prepareData = async () => {
  try {
    await initDB();
    return Promise.all([prepareUserData(), prepareContactsData(), prepareChatsData()]);
  } catch (err) {
    console.error('failed prepare data:', err);
    throw err;
  }
};
