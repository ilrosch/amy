import { db } from '../../database/init';
import reqs from '../../database/handlers/queries';

export const addMessage = async (message) => {
  const { id, body, status, chat_id, from_id, to_id, created_at } = message;
  console.log(message, id, body, status, chat_id, from_id, to_id, created_at);
  try {
    const stmt = await db.prepareAsync(reqs.addMessage);
    await stmt.executeAsync([id, body, status, chat_id, from_id, to_id, created_at]);
    await stmt.finalizeAsync();
  } catch (err) {
    console.log('Add message: ', err);
  }
};
