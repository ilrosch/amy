export type Message = {
  id: string;
  user_from: string;
  user_to: string;
  chat_id: string;
  content: string;
  created_at: string;
  status?: StatusMessage;
};

export type StatusMessage = 'pending' | 'sent' | 'delivered' | 'read' | 'new';
