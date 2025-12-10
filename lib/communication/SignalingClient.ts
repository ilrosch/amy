export interface Signaling {
  sendOffer(to: string, sdp: string): void;
  sendAnswer(to: string, sdp: string): void;
  sendIceCandidate(to: string, candidate: RTCIceCandidateInit): void;
}
