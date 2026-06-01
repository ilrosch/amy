import { SocketManager } from '@/shared/api/socket';
import { IChatSignaling } from '../config/signaling';
import { MessageDTO, MessageStatusChangeDTO } from '../config/types';

export class ChatSignaling implements IChatSignaling {
  constructor(private socket: SocketManager) {}

  sendMessage(peerID: string, message: MessageDTO): boolean {
    return this.socket.send('message', { user_to: peerID, payload: message });
  }

  sendStatus(peerID: string, status: MessageStatusChangeDTO): boolean {
    return this.socket.send('message_status', status);
  }
}
