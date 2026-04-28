import { store } from '../store';

import { i18nextInstance } from '../i18n';

import { router } from '../routes';
import { ContactType } from '@/src/assets/entities/contact';
import { addContactDB } from '@/src/scripts/database/handlers/contact/add';
import { addContactStore, selectContact, updateContactStore } from '../store/slices/contacts';
import { createChat } from '@/src/scripts/app/handlers/create-chat';
import { selectTokenString, selectUserID } from '../store/slices/user';
import { PeerMessage } from '@/src/scripts/app/peer/init';
import { updateStatusContact } from '@/src/scripts/database/handlers/contact/update';
import { Message } from '@/src/assets/entities/message';
import { addMessages } from '@/src/scripts/app/handlers/message/add';

type SocketMessage = {
  type: string;
  payload: object;
};

// current user
const getUserID = () => selectUserID(store.getState());
// current user token
const getUserToken = () => selectTokenString(store.getState());

const { t } = i18nextInstance;

export class SocketManager {
  private countRetries: number = 10;
  socket: WebSocket | null = null;

  private handlePeer: (payload: PeerMessage) => Promise<void> | null = null;
  private handleCall: (payload: PeerMessage) => Promise<void> | null = null;

  connect(): void {
    const token = getUserToken();
    if (!token) return this._reconnect();
    this.socket = new WebSocket(router.user.connect(token));
    this.socket.addEventListener('open', this._onOpen.bind(this));
    this.socket.addEventListener('close', this._onClose.bind(this));
    this.socket.addEventListener('message', this._onMessage.bind(this));
  }

  send(type: string, payload: any): void {
    this.socket?.send(JSON.stringify({ type, payload }));
  }

  private _reconnect(): void {
    if (this.countRetries !== 0) {
      console.log('reconnect after 3 seconds');
      setTimeout(() => this.connect(), 3000);
      this.countRetries -= 1;
    }
  }

  private _onOpen(): void {
    console.log('connection opened');
    // showToast({
    //   type: 'success',
    //   text1: t('toast.conn-server'),
    // });
  }

  private _onClose(e: CloseEvent): void {
    console.log('connection closed; reason:', e.reason);
    if (!e.wasClean) this._reconnect();
  }

  private async _onMessage(e: MessageEvent): Promise<void> {
    const { type, payload }: SocketMessage = JSON.parse(e.data);
    if (type === 'peer' && this.handlePeer) {
      return this.handlePeer(payload as PeerMessage);
    }
    if (type === 'call' && this.handleCall) {
      return this.handleCall(payload as PeerMessage);
    }
    if (type in messageHandles) {
      return messageHandles[type](payload);
    }
  }

  setHandlePeer(handle: (payload: PeerMessage) => Promise<void>) {
    this.handlePeer = handle;
  }

  setHandleCall(handle: (payload: PeerMessage) => Promise<void>) {
    this.handleCall = handle;
  }
}

export const socket = new SocketManager();

// export type OnSDP = (data: { from: string; sdp: RTCSessionDescription }) => Promise<void>;

// export type OnICE = (data: { from: string; candidate: RTCIceCandidate }) => Promise<void>;

// const onAnswerChat: OnSDP = async (data) => {
//   try {
//     const { from, sdp } = data;
//     // ChatManager.setAnswer(from, sdp);
//   } catch (err) {
//     console.error('failed set answer:', err);
//   }
// };

// const onAnswerCall: OnSDP = async (data) => {
//   try {
//     const { sdp } = data;
//     await CallManager.setRemoteSdp(sdp);
//   } catch (err) {
//     console.error('Failed on_answer_call:', err);
//   }
// };

// const onOfferCall: OnSDP = async (data) => {
//   try {
//     const { from, sdp } = data;
//     if (CallManager.getCurrentPeerConn()) return;
//     CallManager.setIncomingOffer(sdp);
//     router.push(`call-reply/${from}`);
//   } catch (err) {
//     console.error('Failed on_offer_call:', err);
//   }
// };

// const onOfferChat: OnSDP = async (data) => {
//   try {
//     // const { from, offer } = data;
//   } catch (err) {
//     console.error('Failed on_offer_chat:', err);
//   }
// };

// const onIceCall: OnICE = async (data) => {
//   try {
//     const { candidate } = data;
//     await CallManager.addIceCandidate(candidate);
//   } catch (err) {
//     console.error('Failed on_ice_call:', err);
//   }
// };

// const onIceChat: OnICE = async (data) => {
//   try {
//     const { from, candidate } = data;
//   } catch (err) {
//     console.error('Failed on_ice_chat:', err);
//   }
// };

// type OnNewData = (data: {
//   contacts: ContactType[] | null;
//   messages: Message[] | null;
// }) => Promise<void>;

// const onNewData: OnNewData = async (data) => {
//   const { contacts, messages } = data;

//   try {
//     if (contacts) await addContacts(contacts);
//   } catch (err) {
//     console.error('Failed save contacts:', err);
//   }

//   try {
//     if (messages) await addMessages(messages);
//   } catch (err) {
//     console.error('Failed save messages:', err);
//   }
// };

const onNewContact = async (contact: ContactType) => {
  try {
    await addContactDB(contact);
    if (selectContact(store.getState(), contact.id)) {
      store.dispatch(updateContactStore({ id: contact.id, changes: { status: contact.status } }));
    } else {
      store.dispatch(addContactStore(contact));
    }
    await createChat(contact);
    console.log('New contact:', contact);
  } catch (err) {
    console.error('Failed add new contact:', err);
  }
};

const onChangeContact = async (contact: ContactType) => {
  try {
    await updateStatusContact(contact.id, contact.status);
    if (selectContact(store.getState(), contact.id)) {
      store.dispatch(updateContactStore({ id: contact.id, changes: { status: contact.status } }));
    } else {
      store.dispatch(addContactStore(contact));
    }
  } catch (err) {
    console.error('Failed add new contact:', err);
  }
};

const onContacts = async (response) => {
  try {
    if (response?.new) {
      response?.new.forEach(async (c) => await onNewContact(c));
    }
    if (response?.accepted) {
      response?.accepted.forEach(async (id) => await onChangeContact({ id, status: 'accepted' }));
    }
    if (response?.rejected) {
      response?.rejected.forEach(async (id) => await onChangeContact({ id, status: 'rejected' }));
    }
  } catch (err) {
    console.error('Failed contacts:', err);
  }
};

const onMessages = async (messages: Message[]) => {
  try {
    console.log(messages);
    await addMessages(messages);
  } catch (err) {
    console.error('Failed add messages:', err);
  }
};

// const onPeerClose = async (payload) => {
//   peerManager.closeConn(payload.user_id);
// };

const messageHandles = {
  new_contact: onNewContact,
  change_contact: onChangeContact,
  contacts: onContacts,
  new_messages: onMessages,
  // peer_close: onPeerClose,
};
