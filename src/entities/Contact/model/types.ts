export enum ContactStatus {
  NEW = 'new',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export type ContactDTO = {
  id: string;
  name: string;
  status: ContactStatus;
  chat_id: string;
};

export type Contact = {
  id: string;
  name: string;
  status: ContactStatus;
  chatID: string;
};
