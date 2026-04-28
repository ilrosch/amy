import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';

type CreateChatDB = (id: string, db?: SQLiteDatabase) => Promise<void>;

export const createChatDB: CreateChatDB = async (id, db = dbInstance) => {
  try {
    await db.runAsync(queries.chat.create, id, id);
  } catch (err) {
    console.error('Failed create chat db:', err);
    throw err;
  }
};
