import { ChatManager, ChatSignaling } from '@/entities/peer-chat';
import { socket } from './socket';
import { peerManager } from './peer-session';

const signaling = new ChatSignaling(socket);
export const chatManager = new ChatManager(peerManager, signaling);