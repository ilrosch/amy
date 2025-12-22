import { ContactType } from '@/scripts/database/handlers/add-contact-db';
import routes from '../routes';
import { store } from '../store';

import handleSocketAddContact from '@/scripts/handlers/socket/add-contact';

import type { Signaling } from '@/lib/communication/SignalingClient';

import { showToast } from '@/scripts/toast';
import { i18nextInstance } from '../i18n';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import BaseP2P from '@/scripts/peer-to-peer/base';
import { CallManager } from '@/scripts/peer-to-peer/call';

// current user
const getCurrentUserID = (): string | null => store.getState().auth?.id;
// current user token
const getCurrentUserToken = (): string | null => store.getState().auth?.token;

export class WebSocketManager implements Signaling {
  private socket: WebSocket | null = null;
  private offline: boolean = false;

  connect() {
    const token = getCurrentUserToken();
    this.socket = new WebSocket(`${routes.connServer()}?token=${token}`);
    this.socket.addEventListener('open', this.onOpen.bind(this));
    this.socket.addEventListener('close', this.onClose.bind(this));
    this.socket.addEventListener('message', this.onMessage.bind(this));
    BaseP2P.setSignaling(socket);
  }

  // --- Signaling interface ---
  sendOffer(type: 'call' | 'chat', to: string, sdp: string): void {
    this.sendMessage({
      type: `offer-${type}`,
      payload: sdp,
      from: getCurrentUserID(),
      to,
    });
  }

  sendAnswer(type: 'call' | 'chat', to: string, sdp: string): void {
    this.sendMessage({
      type: `answer-${type}`,
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

  sendClose(to: string): void {
    this.sendMessage({
      type: 'end-call',
      payload: {},
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
    showToast({ type: 'success', text1: i18nextInstance.t('toast.conn-server') });
  }

  onClose(e: CloseEvent) {
    if (!e.wasClean) {
      console.log('reconnect...');
      setTimeout(() => this.connect(), 5000);
      showToast({ type: 'info', text1: i18nextInstance.t('toast.re-conn-server'), autoHide: false });
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
          CallManager.addIceCandidate(data.payload);
          break;
        }

        case 'offer-call': {
          if (CallManager.getCurrentPeerConn()) return;
          CallManager.incomingOffer = data.payload;
          router.push(`call-reply/${data.from}`);
          break;
        }

        case 'answer-call': {
          CallManager.setAnswerByCall(data.payload);
          break;
        }

        case 'end-call': {
          router.back();
          break;
        }

        case 'user_offline': {
          if (this.offline) break;
          this.offline = true;
          setTimeout(() => {
            router.back();
            Alert.alert('User offline', 'Your contact will know you called when they are online.');
            this.offline = false;
          }, 3000);
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
