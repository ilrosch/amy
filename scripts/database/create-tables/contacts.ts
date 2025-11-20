import { SQLiteDatabase } from "expo-sqlite";

const createContactsTable = async (db: SQLiteDatabase) => {
  const req = `
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT,
      create_time DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return db.execAsync(req);
};

export default createContactsTable;
