import { PeerManager, PeerSignaling, peerSocketHandler } from '@/entities/peer-session';
import { socket } from './socket';

const signaling = new PeerSignaling(socket);
export const peerManager = new PeerManager(signaling);
export const peerHandler = peerSocketHandler(peerManager);
