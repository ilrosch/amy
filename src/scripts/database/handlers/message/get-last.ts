import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import { Message } from '@/src/assets/entities/message';
import queries from '../queries';

interface GetLastMessageDB {
  id: string;
  db: SQLiteDatabase;
}

export const getLastMessageDB = async ({
  id,
  db = dbInstance,
}: GetLastMessageDB): Promise<Message> => {
  try {
    const stmt = await db.prepareAsync(queries.message.getLast);
    const rows = await stmt.executeAsync(id);
    const res = (await rows.getFirstAsync()) as Message;
    await stmt.finalizeAsync();
    return res;
  } catch (err) {
    console.error('Failed get last message db:', err);
    throw err;
  }
};
