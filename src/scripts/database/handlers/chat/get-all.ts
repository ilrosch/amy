import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import { ChatType } from '@/src/assets/entities/chat';
import queries from '../queries';

type GetChatsDB = (db?: SQLiteDatabase) => Promise<ChatType[]>;

export const getChatsDB: GetChatsDB = async (db = dbInstance) => {
  try {
    const stmt = await db.prepareAsync(queries.chat.getAll);
    const res = await stmt.executeAsync();
    const chat = (await res.getAllAsync()) as ChatType[];
    await stmt.finalizeAsync();
    return chat;
  } catch (err) {
    console.error('Failed get chats db:', err);
    throw err;
  }
};
