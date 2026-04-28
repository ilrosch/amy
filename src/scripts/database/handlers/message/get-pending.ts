import { Message } from '@/src/assets/entities/message';
import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';

type GetMessagesPendingDB = (id: string, db?: SQLiteDatabase) => Promise<Message[]>;

export const getMessagesPendingDB: GetMessagesPendingDB = async (id, db = dbInstance) => {
  try {
    return db.getAllAsync(queries.message.getPending, id);
  } catch (err) {
    console.error('Failed get pending messages:', err);
    throw err;
  }
};
