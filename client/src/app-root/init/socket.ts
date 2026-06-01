import { SocketManager } from '@/shared/api/socket';
import { buildSocketURL } from '../config';

export const socket = new SocketManager(buildSocketURL);
