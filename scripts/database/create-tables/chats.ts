import { SQLiteDatabase } from "expo-sqlite";

const createChatsTable = async (db: SQLiteDatabase) => {
  const req = `
    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      name TEXT,
      create_time DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return db.execAsync(req);
};

export default createChatsTable;
