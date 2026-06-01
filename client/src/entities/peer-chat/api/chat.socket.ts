import { saveMessages } from './saveMessage';
import { updateMessagesStatus } from './updateMesaageStatus';

export const chatSocketHandler = async (data: any) => {
  const { type, payload } = data;

  switch (type) {
    case 'new_messages':
      await saveMessages(payload);
      break;
    case 'message_statuses':
      await updateMessagesStatus(payload);
      break;
  }
};
