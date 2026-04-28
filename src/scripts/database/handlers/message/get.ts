import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import { Message } from '@/src/assets/entities/message';
import queries from '../queries';

type GetMessagesDB = (
  chatID: string,
  page: number,
  limit: number,
  db?: SQLiteDatabase,
) => Promise<Message[]>;

export const getMessagesDB: GetMessagesDB = async (chatID, page, limit = 10, db = dbInstance) => {
  const offset = (page - 1) * limit;

  try {
    return db.getAllAsync(queries.message.getLimit, chatID, limit, offset);
  } catch (err) {
    console.error('Failed get messages db:', err);
    throw err;
  }
};

export const getMessagesByIds = async (ids: string[] = [], db = dbInstance) => {
  try {
    return db.getAllAsync<Message>(queries.message.getByIDS, ids.join(','));
  } catch (err) {
    console.error('failed to get messages queue:', err);
    throw err;
  }
};
