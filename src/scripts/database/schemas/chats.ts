import { SQLiteDatabase } from 'expo-sqlite';

const createChatsTable = async (db: SQLiteDatabase) => {
  await db.execAsync('PRAGMA foreign_keys = ON;');

  const req = `
    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id) REFERENCES contacts (chat_id) ON DELETE CASCADE
    );
  `;

  // return db.execAsync("DROP TABLE chats");
  return db.execAsync(req);
};

export default createChatsTable;
