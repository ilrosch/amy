import { mapDtoToPayload } from '../model/mapper';
import { PeerManager } from '../model/PeerManager';

export enum PeerSocketEvent {
  ANSWER = 'answer',
  OFFER = 'offer',
  ICE = 'ice_candidate',
  PEER_CLOSE = 'peer_close',
}

export const peerSocketHandler = (peerManager: PeerManager) => async (d: any) => {
  let { type: t, payload } = d;

  if (t !== 'peer') return;

  let { type, peerID, data } = mapDtoToPayload(payload);

  switch (type as PeerSocketEvent) {
    case PeerSocketEvent.ANSWER:
      await peerManager.setRemoteSDP(peerID, data);
      break;
    case PeerSocketEvent.OFFER:
      await peerManager.answer(peerID, data);
      break;
    case PeerSocketEvent.ICE:
      await peerManager.iceCandidate(peerID, data);
      break;
    case PeerSocketEvent.PEER_CLOSE:
      await peerManager.closeSession(peerID);
      break;
    default:
      console.warn('unknown peer socket event:', data);
  }
};
