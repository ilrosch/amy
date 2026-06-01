import { withDB } from '@/shared/api/db';
import { MessageDTO, MessageStatus } from '../config/types';
import { UPDATE_STATUS } from './queries';
import { withTx } from '@/shared/api/db/connection';

export const updateMessageStatus = async (messageID: string, status: MessageStatus) =>
  withDB(async (db) => {
    try {
      await db.runAsync(UPDATE_STATUS, [status, messageID]);
    } catch (err) {
      console.error('failed to update status message:', err);
      throw err;
    }
  });

export const updateMessagesStatus = async (messages: MessageDTO[]) =>
  withTx(async (tx) => {
    for (const message of messages) {
      await tx.runAsync(UPDATE_STATUS, [message.id, message.status]);
    }
  });
