import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';

export type PeerEvents = {
  connectionstatechange: { peerID: string; state: RTCPeerConnectionState };
  datachannel: { peerID: string; channel: RTCDataChannel };
  track: { peerID: string; event: RTCTrackEvent };
  icecandidate: { peerID: string; candidate: RTCIceCandidate };
  negotiationneeded: { peerID: string };
  close: { peerID: string };
  connected: { peerID: string };
};

export type PeerEventHandler<T extends keyof PeerEvents> = (data: PeerEvents[T]) => void;
