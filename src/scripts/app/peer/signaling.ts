import { Message } from '@/src/assets/entities/message';
import { SocketManager } from '@/src/lib/clients/socket';
import { RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';

export type SignalingType = 'offer' | 'answer' | 'ice_candidate';
export type CallStatus = 'request_call' | 'accepted_call' | 'rejected_call';

export interface SignalingPayload {
  type: SignalingType | CallStatus;
  user_id: string;
  payload?: RTCSessionDescription | RTCIceCandidate;
}

export class Signaling {
  constructor(private socket: SocketManager) {}

  sendMessage(message: Message): void {
    this.socket.send('message', message);
  }

  sendOffer(peerID: string, sdp: RTCSessionDescription): void {
    this._send({
      type: 'offer',
      user_id: peerID,
      payload: sdp,
    });
  }

  sendAnswer(peerID: string, sdp: RTCSessionDescription): void {
    this._send({
      type: 'answer',
      user_id: peerID,
      payload: sdp,
    });
  }

  sendIceCandidate(peerID: string, candidate: RTCIceCandidate): void {
    this._send({
      type: 'ice_candidate',
      user_id: peerID,
      payload: candidate,
    });
  }

  sendStatusCall(peerID: string, status: CallStatus): void {
    this._send({
      type: status,
      user_id: peerID,
    });
  }

  private _send(payload: SignalingPayload): void {
    this.socket.send('peer', payload);
  }
}

export const createSignaling = (socket: SocketManager): Signaling => new Signaling(socket);
