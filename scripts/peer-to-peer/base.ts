import { WebSocketManager } from '@/lib/clients/socket';
import { Signaling } from '@/lib/communication/SignalingClient';

export default abstract class BaseP2P {
  protected static signaling: Signaling | null = null;

  static setSignaling(socket: WebSocketManager) {
    this.signaling = socket;
  }
}
