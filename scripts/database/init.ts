import * as SQLite from 'expo-sqlite';
import createContactsTable from './create-tables/contacts';
import createChatsTable from './create-tables/chats';
import createMessagesTable from './create-tables/messages';

export const db = SQLite.openDatabaseSync('amy-client');

const initDB = async () => {
  try {
    const psTableContacts = createContactsTable(db);
    const psTableChats = createChatsTable(db);
    const psTableMessages = createMessagesTable(db);
    await Promise.all([psTableContacts, psTableChats, psTableMessages]);
  } catch (err) {
    console.log(err);
  }
};

export default initDB;
