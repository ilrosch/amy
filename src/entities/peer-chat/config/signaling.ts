import { MessageDTO, MessageStatusChangeDTO } from '../config/types';

export interface IChatSignaling {
  sendMessage(peerID: string, message: MessageDTO): boolean;
  sendStatus(peerID: string, status: MessageStatusChangeDTO): boolean;
}
