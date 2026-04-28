import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import { StatusMessage } from '@/src/assets/entities/message';
import queries from '../queries';

type UpdateStatusMessagesDB = (
  ids: string[],
  status: StatusMessage,
  db?: SQLiteDatabase,
) => Promise<void>;

export const updateStatusMessagesDB: UpdateStatusMessagesDB = async (
  ids,
  status,
  db = dbInstance,
) => {
  try {
    await db.withTransactionAsync(async () => {
      const stmt = await db.prepareAsync(queries.message.updateStatus);
      for (const id of ids) {
        await stmt.executeAsync(status, id);
      }
      await stmt.finalizeAsync();
    });
  } catch (err) {
    console.error('Failed update status message db:', err);
    throw err;
  }
};
