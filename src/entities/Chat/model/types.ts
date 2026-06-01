export type ChatDTO = {
  id: string;
  contactName: string;
  lastMessageAt: string | null;
  lastMessageStatus: string | null;
  lastMessageContent: string | null;
};

export type Chat = {
  id: string;
  contactName: string;
  lastMessage: {
    at: string;
    status: string;
    content: string;
  } | null;
};
