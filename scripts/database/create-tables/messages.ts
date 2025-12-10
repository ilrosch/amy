import { SQLiteDatabase } from 'expo-sqlite';

const createMessagesTable = async (db: SQLiteDatabase) => {
  const req = `
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      chat_id TEXT NOT NULL,
      from_id TEXT NOT NULL,
      to_id TEXT NOT NULL,
      body TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME NOT NULL,
      FOREIGN KEY (chat_id) REFERENCES chats(id)
    );
  `;
  // return db.execAsync("DROP TABLE messages");

  return db.execAsync(req);
};

export default createMessagesTable;
