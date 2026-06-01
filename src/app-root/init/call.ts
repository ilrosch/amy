import { CallManager, CallSignaling } from '@/entities/call';
import { peerManager } from './peer-session';
import { socket } from './socket';
import { callSocketHandler } from '@/entities/call/api/call.socket';

const signaling = new CallSignaling(socket);
export const callManager = new CallManager(peerManager, signaling);
export const callHandler = callSocketHandler(callManager);
