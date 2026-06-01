export type MessageDTO = {
  id: string;
  chat_id: string;
  user_from: string;
  user_to: string;
  content: string;
  status: string;
  created_at: string;
};

export type Message = {
  id: string;
  chatID: string;
  userFrom: string;
  userTo: string;
  content: string;
  createdAt: string;
  status: MessageStatus;
};

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'new';

export type MessageStatusChangeDTO = {
  id: string;
  user_from: string;
  user_to: string;
  chat_id: string;
  status: string;
};

export type MessageStatusChange = {
  id: string;
  userFrom: string;
  userTo: string;
  chatID: string;
  status: MessageStatus;
};
