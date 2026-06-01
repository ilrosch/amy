import { Chat, ChatDTO } from './types';

export const mapChatDtoToEntity = (chatDTO: ChatDTO): Chat => ({
  id: chatDTO.id,
  contactName: chatDTO.contactName,
  lastMessage: chatDTO.lastMessageStatus
    ? {
        at: chatDTO.lastMessageAt,
        status: chatDTO.lastMessageStatus,
        content: chatDTO.lastMessageContent,
      }
    : null,
});
