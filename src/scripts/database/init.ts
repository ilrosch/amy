import * as SQLite from 'expo-sqlite';
import createContactsTable from './schemas/contacts';
import createChatsTable from './schemas/chats';
import createMessagesTable from './schemas/messages';

export const db = SQLite.openDatabaseSync('amy-client');

const initDB = async () => {
  try {
    await db.execAsync('PRAGMA journal_mode = WAL;');

    // const tables = await db.getAllAsync(
    //   "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
    // );

    // console.log('Таблицы:', tables);
    const psTableContacts = createContactsTable(db);
    const psTableChats = createChatsTable(db);
    const psTableMessages = createMessagesTable(db);
    await Promise.all([psTableContacts, psTableChats, psTableMessages]);
  } catch (err) {
    console.log(err);
  }
};

export default initDB;
