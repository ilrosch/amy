import { withDB } from '@/shared/api/db';
import { MessageDTO } from '../config/types';
import { SAVE_MESSAGE } from './queries';
import { withTx } from '@/shared/api/db/connection';
import { updateChat } from '@/entities/chat';

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

      const { store } = await import('@/app-root/store');

      store.dispatch(
        updateChat({
          id: message.chat_id,
          changes: {
            lastMessage: {
              at: message.created_at,
              status: message.status,
              content: message.content,
            },
          },
        }),
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

      const { store } = await import('@/app-root/store');

      store.dispatch(
        updateChat({
          id: message.chat_id,
          changes: {
            lastMessage: {
              at: message.created_at,
              status: message.status,
              content: message.content,
            },
          },
        }),
      );
    }
  });
