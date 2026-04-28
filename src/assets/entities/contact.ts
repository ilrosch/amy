export type ContactType = {
  id: string;
  name: string;
  status: string;
  chat_id: string;
};

export type Contact = {
  id: string;
  name: string;
  status: string;
  chat_id: string;
};

export const StatusNew = 'new';
export const StatusPending = 'pending';
export const StatusAccepted = 'accepted';
export const StatusRejected = 'rejected';

export enum ContactStatus {
  New = 'new',
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}
