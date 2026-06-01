import { withDB } from '@/shared/api/db';
import { MessageDTO } from '../config/types';
import { SAVE_MESSAGE } from './queries';
import { withTx } from '@/shared/api/db/connection';

export const saveMessage = (message: MessageDTO) =>
  withDB(async (db) => {
    try {
      await db.runAsync(
        SAVE_MESSAGE,
        message.id,
        message.user_from,
        message.user_to,
        message.chat_id,
        message.content,
        message.status,
        message.created_at,
      );
    } catch (err) {
      console.error('failed to save message:', err);
      throw err;
    }
  });

export const saveMessages = (messages: MessageDTO[]) =>
  withTx(async (tx) => {
    for (const message of messages) {
      await tx.runAsync(SAVE_MESSAGE, [
        message.id,
        message.user_from,
        message.user_to,
        message.chat_id,
        message.content,
        message.status,
        message.created_at,
      ]);
    }
  });
