export interface Signaling {
  sendOffer(type: 'call' | 'chat', to: string, sdp: string): void;
  sendAnswer(type: 'call' | 'chat', to: string, sdp: string): void;
  sendIceCandidate(to: string, candidate: RTCIceCandidateInit): void;
  sendClose(to: string): void;
}
