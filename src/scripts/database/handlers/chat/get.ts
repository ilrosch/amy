import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import { ChatType } from '@/src/assets/entities/chat';
import queries from '../queries';

type GetChatDB = (id: string, db?: SQLiteDatabase) => Promise<ChatType>;

export const getChatDB: GetChatDB = async (id, db = dbInstance) => {
  try {
    const stmt = await db.prepareAsync(queries.chat.get);
    const res = await stmt.executeAsync(id);
    const chat = (await res.getFirstAsync()) as ChatType;
    await stmt.finalizeAsync();
    return chat;
  } catch (err) {
    console.error('Failed get chat db:', err);
    throw err;
  }
};
