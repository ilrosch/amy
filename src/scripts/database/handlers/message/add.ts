import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';
import { Message } from '@/src/assets/entities/message';
import { createChat } from '@/src/scripts/app/handlers/chat/create';

type AddMessagesDB = (messages: Message[], db?: SQLiteDatabase) => Promise<void>;

export const addMessageDB = async (m: Message, db = dbInstance) => {
  try {
    await db.runAsync(
      queries.message.add,
      m.id,
      m.user_from,
      m.user_to,
      m.chat_id,
      m.content,
      m.status ?? 'pending',
      m.created_at,
    );
  } catch (err) {
    console.error('failed to save message:', err);
    throw err;
  }
};

export const addMessagesDB: AddMessagesDB = async (messages, db = dbInstance) => {
  try {
    // GПодготовить чат
    await db.withTransactionAsync(async () => {
      const stmt = await db.prepareAsync(queries.message.add);
      for (const message of messages) {

        await stmt.executeAsync(
          message.id,
          message.user_from,
          message.user_to,
          message.chat_id,
          message.content,
          message.status ?? 'new',
          message.created_at ?? new Date().toUTCString(),
        );
      }
      await stmt.finalizeAsync();
    });
  } catch (err) {
    console.error('Failed add messages db:', err);
    throw err;
  }
};
