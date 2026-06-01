export interface SocketMessageDto {
  type: string;
  user_id: string;
  payload?: any;
}

export interface PeerEventPayload<T = any> {
  type: string;
  peerID: string;
  data: T;
}

export type PeerMessage =
  | { type: 'offer' | 'answer'; peerID: string; data: RTCSessionDescriptionInit }
  | { type: 'ice_candidate'; peerID: string; data: RTCIceCandidateInit }
  | { type: 'peer_close'; peerID: string; data?: never };
