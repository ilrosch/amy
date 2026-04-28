import { socket } from '@/src/lib/clients/socket';
import { createPeerManager } from './peer';
import { createChatManager } from './chat';
import { createSignaling } from './signaling';
import { createCallManager } from './call';
import { router } from 'expo-router';

const signaling = createSignaling(socket);
const peerManager = createPeerManager(signaling);
const chatManager = createChatManager(peerManager);
const callManager = createCallManager(peerManager);

export type PeerMessage = {
  type: string;
  user_id: string;
  payload?: any;
};

export const handlePeer = async (data: PeerMessage) => {
  const { type, user_id: peerID, payload } = data;

  switch (type) {
    case 'peer_close':
      peerManager.closeConn(peerID);
      break;
    case 'offer':
      peerManager.answer(peerID, payload);
      break;
    case 'answer':
      peerManager.setRemoteSDP(peerID, payload);
      break;
    case 'ice_candidate':
      peerManager.iceCandidate(peerID, payload);
      break;

    case 'request_call':
      router.push(`call-reply/${peerID}`);
      break;
    case 'accepted_call':
      await callManager.init(peerID);
      break;
    case 'rejected_call':
      break;
    case 'busy_call':
      break;

    default:
      console.warn(`unknown peer message type: ${payload.type}`);
  }
};

socket.setHandlePeer(handlePeer);

export const handleCall = async (data: PeerMessage) => {
  const { type, user_id: peerID, payload } = data;

  switch (type) {
    // case 'request_call':
    //   router.push(`call-reply/${peerID}`);
    //   signaling.sendStatusCall(peerID, 'accepted_call');
    //   break;
    // case 'accepted_call':
    //   await callManager.init(peerID);
    //   break;
    // case 'rejected_call':
    //   break;
    // case 'busy_call':
    //   break;
    default:
      console.warn(`unknown peer message type: ${payload.type}`);
  }
};

socket.setHandleCall(handleCall);

export { signaling, peerManager, chatManager, callManager };
