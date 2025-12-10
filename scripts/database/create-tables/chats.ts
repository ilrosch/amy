import { SQLiteDatabase } from 'expo-sqlite';

const createChatsTable = async (db: SQLiteDatabase) => {
  const req = `
    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES contacts(id)
    );
  `;

  // return db.execAsync("DROP TABLE chats");
  return db.execAsync(req);
};

export default createChatsTable;
