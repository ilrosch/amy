import { SQLiteDatabase } from 'expo-sqlite';

const createContactsTable = async (db: SQLiteDatabase) => {
  const req = `
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      chat_id TEXT NOT NULL UNIQUE,
      create_time DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // return db.execAsync('DROP TABLE contacts');
  return db.execAsync(req);
};

export default createContactsTable;
