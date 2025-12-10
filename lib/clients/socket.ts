import { ContactType } from '@/scripts/database/handlers/add-contact-db';
import routes from '../routes';
import { store } from '../store';

import handleSocketAddContact from '@/scripts/handlers/socket/add-contact';

import type { Signaling } from '@/lib/communication/SignalingClient';
import { p2pManager } from '@/scripts/p2p';
import { closeNotice, reConnServerNotice } from '@/components/Notice';

// current user
const getCurrentUserID = (): string | null => store.getState().auth?.id;
// current user token
const getCurrentUserToken = (): string | null => store.getState().auth?.token;

export class WebSocketManager implements Signaling {
  private socket: WebSocket | null = null;
  private notice: boolean = false;

  connect() {
    const token = getCurrentUserToken();
    this.socket = new WebSocket(`${routes.connServer()}?token=${token}`);
    this.socket.addEventListener('open', this.onOpen.bind(this));
    this.socket.addEventListener('close', this.onClose.bind(this));
    this.socket.addEventListener('message', this.onMessage.bind(this));
    p2pManager.setSignaling(socket);
  }

  // --- Signaling interface ---
  sendOffer(to: string, sdp: string): void {
    this.sendMessage({
      type: 'offer',
      payload: sdp,
      from: getCurrentUserID(),
      to,
    });
  }

  sendAnswer(to: string, sdp: string): void {
    this.sendMessage({
      type: 'answer',
      payload: sdp,
      from: getCurrentUserID(),
      to,
    });
  }

  sendIceCandidate(to: string, candidate: RTCIceCandidateInit): void {
    this.sendMessage({
      type: 'ice_candidate',
      payload: candidate,
      from: getCurrentUserID(),
      to,
    });
  }

  // --- WebSocket logic ---
  sendMessage(message: unknown) {
    this.socket?.send(JSON.stringify(message));
  }

  onOpen() {
    console.log('connection server: opened');
    closeNotice();
    this.notice = false;
  }

  onClose(e: CloseEvent) {
    if (!e.wasClean) {
      console.log('reconnect...');
      setTimeout(() => this.connect(), 5000);
      if (!this.notice) {
        reConnServerNotice();
        this.notice = true;
      }
    }
    console.log('connection server: closed; reason:', e.reason);
  }

  async onMessage(e: MessageEvent) {
    try {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case 'add_contact':
          handleSocketAddContact({ id: data.id, name: data.name });
          break;

        case 'new_contacts':
          data.contacts.forEach((c: ContactType) => handleSocketAddContact(c));
          break;

        case 'answer': {
          p2pManager.setAnswer(data.from, data.payload);
          break;
        }

        case 'offer': {
          p2pManager.connect(data.from);
          await p2pManager.answer(data.from, data.payload);
          break;
        }

        case 'ice_candidate': {
          p2pManager.addIceCandidate(data.from, data.payload);
          break;
        }

        default:
          console.log('unknown type:', data.type);
      }
    } catch (err) {
      console.error('Failed to parse WebSocket message', err);
    }
  }
}

export const socket = new WebSocketManager();
