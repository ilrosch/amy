import {
  Message,
  MessageDTO,
  MessageStatus,
  MessageStatusChange,
  MessageStatusChangeDTO,
} from '../config/types';

export const mapMessageDtoToEntity = (dto: MessageDTO): Message => ({
  id: dto.id,
  chatID: dto.chat_id,
  userFrom: dto.user_from,
  userTo: dto.user_to,
  content: dto.content,
  status: dto.status as MessageStatus,
  createdAt: dto.created_at,
});

export const mapMessageEntityToDto = (entity: Message): MessageDTO => ({
  id: entity.id,
  chat_id: entity.chatID,
  user_from: entity.userFrom,
  user_to: entity.userTo,
  content: entity.content,
  status: entity.status,
  created_at: entity.createdAt,
});

export const mapStatusChangeDtoToEntity = (dto: MessageStatusChangeDTO): MessageStatusChange => {
  return {
    id: dto.id,
    userFrom: dto.user_from,
    userTo: dto.user_to,
    chatID: dto.chat_id,
    status: (dto.status as MessageStatus) || 'new',
  };
};

export const mapStatusChangeEntityToDto = (entity: MessageStatusChange): MessageStatusChangeDTO => {
  return {
    id: entity.id,
    user_from: entity.userFrom,
    user_to: entity.userTo,
    chat_id: entity.chatID,
    status: entity.status,
  };
};
