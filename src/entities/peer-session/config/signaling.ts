import type { RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';

export interface IPeerSignaling {
  sendAnswer(peerID: string, sdp: RTCSessionDescription): void;
  sendOffer(peerID: string, sdp: RTCSessionDescription): void;
  sendOfferCall(peerID: string, sdp: RTCSessionDescription): void;
  sendIceCandidate(peerID: string, candidate: RTCIceCandidate): void;
}

export type PeerSignal = {
  type: 'answer' | 'offer' | 'offer_call' | 'ice_candidate';
  user_id: string;
  payload: any;
};
