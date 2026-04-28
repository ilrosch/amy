import { SQLiteDatabase } from 'expo-sqlite';

const createMessagesTable = async (db: SQLiteDatabase) => {
  const req = `
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      chat_id TEXT NOT NULL,
      user_from TEXT NOT NULL,
      user_to TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  // return db.execAsync('DROP TABLE messages');

  return db.execAsync(req);
};

export default createMessagesTable;
