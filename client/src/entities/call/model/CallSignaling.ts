import { SocketManager } from '@/shared/api/socket';
import { ICallSignaling, CallSignal } from '../config/signaling';

export class CallSignaling implements ICallSignaling {
  constructor(private socket: SocketManager) {}

  sendSignal(peerID: string, signal: CallSignal): void {
    this.socket.send('call', { type: signal, user_id: peerID });
  }
}
