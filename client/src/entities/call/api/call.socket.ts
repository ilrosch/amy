import { mapDtoToPayload } from '@/entities/peer-session/model/mapper';
import { CallManager } from '../model';
import { CallSignal } from '../config/signaling';
import { router } from 'expo-router';
import { ROUTES } from '@/shared/config/routes';

export const callSocketHandler = (callManager: CallManager) => async (d: any) => {
  const { type: t, payload } = d;
  if (t !== 'call') return;

  const { type, peerID, data } = mapDtoToPayload(payload);

  switch (type as CallSignal) {
    case 'request_call':
      router.push(ROUTES.CALL.INCOMING(peerID));
      break;
    case 'accepted_call':
      await callManager.init(peerID);
      break;
    case 'rejected_call':
      await callManager.end(peerID);
      break;
    case 'busy_call':
      break;
    case 'end_call':
      await callManager.end(peerID);
      break;
    case 'offer_call':
      await callManager.answer(peerID, data);
      break;
    default:
      console.warn('unknown call socket event:', data);
  }
};
