import { db } from '../init';
import { ContactType } from './add-contact-db';
import reqs from './reqs';

const getContacts = async (): Promise<ContactType[]> => {
  try {
    const stmt = await db.prepareAsync(reqs.getContacts);
    const res = await stmt.executeAsync();
    const contacts = await res.getAllAsync();
    await stmt.finalizeAsync();
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export default getContacts;
