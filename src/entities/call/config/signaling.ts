export type CallSignal =
  | 'request_call'
  | 'accepted_call'
  | 'rejected_call'
  | 'busy_call'
  | 'offer_call'
  | 'end_call';

export interface ICallSignaling {
  sendSignal(peerID: string, signal: CallSignal): void;
}
