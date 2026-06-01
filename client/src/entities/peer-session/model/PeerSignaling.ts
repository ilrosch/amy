import { SocketManager } from '@/shared/api/socket';
import { IPeerSignaling, PeerSignal } from '../config/signaling';
import { RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';

export class PeerSignaling implements IPeerSignaling {
  constructor(private socket: SocketManager) {}

  sendAnswer(peerID: string, sdp: RTCSessionDescription): void {
    this._send({ type: 'answer', user_id: peerID, payload: sdp });
  }

  sendOffer(peerID: string, sdp: RTCSessionDescription): void {
    this._send({ type: 'offer', user_id: peerID, payload: sdp });
  }

  sendOfferCall(peerID: string, sdp: RTCSessionDescription): void {
    this._send({ type: 'offer_call', user_id: peerID, payload: sdp }, 'call');
  }

  sendIceCandidate(peerID: string, candidate: RTCIceCandidate): void {
    this._send({ type: 'ice_candidate', user_id: peerID, payload: candidate });
  }

  private _send(payload: PeerSignal, variant: 'peer' | 'call' = 'peer') {
    const isSent = this.socket.send(variant, payload);
    if (!isSent) throw new Error('fail signaling');
  }
}
