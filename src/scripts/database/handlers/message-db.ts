import { SQLiteDatabase } from 'expo-sqlite';
import { Message, StatusMessage } from '@/src/assets/entities/message';
import { db as defaultDB } from '../init';
import reqs from './queries';

// export const saveMessageDB = async (message: Message, db: SQLiteDatabase = defaultDB) => {
//   try {
//     const stmt = await db.prepareAsync(reqs.saveMessage);
//     await stmt.executeAsync(
//       message.id,
//       message.body,
//       message.status,
//       message.chat_id,
//       message.from_id,
//       message.to_id,
//       message.created_at,
//     );
//     await stmt.finalizeAsync();
//   } catch (err) {
//     console.log('Failed save message db:', err);
//     throw err;
//   }
// };

// export const updateStatusMessageDB = async (
//   messageID: string,
//   status: StatusMessage,
//   db: SQLiteDatabase = defaultDB,
// ) => {
//   try {
//     const stmt = await db.prepareAsync(reqs.updateStatusMessage);
//     await stmt.executeAsync(messageID, status);
//     await stmt.finalizeAsync();
//   } catch (err) {
//     console.log('Failed update status message db:', err);
//     throw err;
//   }
// };

export const getPendingMessagesForContact = async (
  contactID: string,
  db: SQLiteDatabase = defaultDB,
) => {
  try {
    const stmt = await db.prepareAsync(reqs.getPendingMessages);
    const rows = await stmt.executeAsync(contactID);
    const messages = (await rows.getAllAsync()) as Message[];
    await stmt.finalizeAsync();
    return messages;
  } catch (err) {
    console.log('Failed get pending message db:', err);
    throw err;
  }
};
