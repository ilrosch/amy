import { RTCIceCandidate, RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';
import BaseP2P from './base';
import { peerConnConfig } from './tokens';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import { store } from '@/src/lib/store';
import {
  addMessagesStore,
  addMessageStore,
  updateMessagesStore,
} from '@/src/lib/store/slices/messages';

import { Message, StatusMessage } from '@/src/assets/entities/message';
import { addMessageDB, addMessagesDB } from '../database/handlers/message/add';
import { getMessagesPendingDB } from '../database/handlers/message/get-pending';
import { updateStatusMessagesDB } from '../database/handlers/message/update-status';
import { Update } from '@reduxjs/toolkit';
import { sendPush } from '../push/send';
import SocketManager from '@/src/lib/clients/socket';

class Chat extends BaseP2P {
  private peerConns: Record<string, RTCPeerConnection> = {};
  private channels: Record<string, RTCDataChannel> = {};
  // private inactivityTimer: NodeJS.Timeout | null = null;

  // **********
  // Init chat
  // **********
  async initChat(remoteID: string) {
    try {
      this._prepareChat(remoteID);
      this.channels[remoteID] = this.peerConns[remoteID]?.createDataChannel('chat');
      this._handleDataChannel(remoteID);
      await this._offer(remoteID);
    } catch (err) {
      console.log('Failed init chat:', err);
      throw err;
    }
  }

  async initChatReceive(remoteID: string, sdp: string) {
    try {
      this._prepareChat(remoteID);
      this.peerConns[remoteID].addEventListener('datachannel', (e) => {
        this.channels[remoteID] = e.channel;
        this._handleDataChannel(remoteID);
      });
      await this._answer(remoteID, sdp);
    } catch (err) {
      console.log('Failed init receive chat:', err);
      throw err;
    }
  }

  // **********
  // Chat processing and preparing methods
  // **********
  private _prepareChat(remoteID: string) {
    try {
      const peerConn = new RTCPeerConnection(peerConnConfig);
      this._handlePeerConn(peerConn, remoteID);
      this.peerConns[remoteID] = peerConn;
      // this._resetInactivityTimer(remoteID);
    } catch (err) {
      console.log('Failed prepare chat:', err);
      throw err;
    }
  }

  private _handlePeerConn(peerConn: RTCPeerConnection, remoteID: string) {
    peerConn.addEventListener('connectionstatechange', (e) => {
      console.log('Change state: ', peerConn.connectionState, remoteID);
    });
    peerConn.addEventListener('icecandidate', (e) => {
      if (e.candidate) {
        BaseP2P.signaling?.sendIceCandidate('chat', remoteID, e.candidate);
      }
    });
    peerConn.addEventListener('icecandidateerror', (e) => {
      console.log(`Ice candidate failed ${remoteID}`);
    });
    peerConn.addEventListener('negotiationneeded', (e) => {
      console.log('Negotition ', e);
    });
    peerConn.addEventListener('signalingstatechange', (e) => {
      console.log('Signal', peerConn.signalingState);
    });
  }

  private _handleDataChannel(remoteID: string) {
    const dataChannel = this.channels[remoteID];
    dataChannel.addEventListener('open', async () => {
      try {
        const messages: Message[] = await getMessagesPendingDB(remoteID);
        dataChannel.send(JSON.stringify({ type: 'messages', messages }));
      } catch (err) {
        console.log('Failed send pending message:', err);
      }
    });
    dataChannel.addEventListener('close', () => {
      console.log(`Close channel with ${remoteID}`);
      delete this.channels[remoteID];
    });
    dataChannel.addEventListener('message', async ({ data }) => {
      const { type, ...payload } = JSON.parse(data);
      switch (type) {
        case 'message': {
          const { message }: { message: Message } = payload;

          let status: StatusMessage = 'delivered';
          if (store.getState().messages.chatID === remoteID) {
            store.dispatch(addMessageStore(message));
            status = 'read';
          }

          try {
            await addMessageDB(message);
          } catch (err) {
            console.error('Failed save message:', err);
            throw err;
          }

          try {
            await this.sendStatus(remoteID, [message.id], status);
          } catch (err) {
            console.error('Failed send status message:', err);
            throw err;
          }

          break;
        }
        case 'messages': {
          const { messages }: { messages: Message[] } = payload;

          let status: StatusMessage = 'delivered';
          if (store.getState().messages.chatID === remoteID) {
            store.dispatch(addMessagesStore(messages));
            status = 'read';
          }

          // save messages and send update status
          try {
            await addMessagesDB(messages);
            const ids = messages.map(({ id }) => id);
            this.sendStatus(remoteID, ids, status);
          } catch (err) {
            console.error('Failed save messages:', err);
          }

          break;
        }
        case 'status': {
          const { ids, status }: { ids: string[]; status: StatusMessage } = payload;
          if (store.getState().messages.chatID === remoteID) {
            const updates: Update<Message, string>[] = ids.map((id) => ({
              id,
              changes: { status },
            }));
            store.dispatch(updateMessagesStore(updates));
          }

          try {
            await updateStatusMessagesDB(ids, status);
          } catch (err) {
            console.error('Failed change status message', err);
          }

          break;
        }
      }
    });
  }

  // Create and send offer sdp
  private async _offer(remoteID: string) {
    try {
      const peerConn = this.peerConns[remoteID];
      const offer = await peerConn.createOffer();
      await peerConn.setLocalDescription(offer);
      BaseP2P.signaling?.sendOffer('chat', remoteID, offer.sdp);
    } catch (err) {
      console.log('Failed create offer:', err);
      throw err;
    }
  }

  // Create and send answer sdp
  private async _answer(remoteID: string, sdp: string) {
    try {
      const peerConn = this.peerConns[remoteID];
      const offerDesc = new RTCSessionDescription({ type: 'offer', sdp });
      await peerConn.setRemoteDescription(offerDesc);
      const answer = await peerConn.createAnswer();
      await peerConn.setLocalDescription(answer);
      BaseP2P.signaling?.sendAnswer('chat', remoteID, answer.sdp);
    } catch (err) {
      console.log('Failed create answer:', err);
      throw err;
    }
  }

  // Candidate
  async addIceCandidate(remoteID: string, candidate: RTCIceCandidateInit) {
    try {
      await this.peerConns[remoteID]?.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.log('Failed add candidate:', err);
    }
  }

  // Set remote sdp (answer)
  async setAnswer(remoteID: string, sdp: string) {
    try {
      const answerDesc = new RTCSessionDescription({ type: 'answer', sdp });
      await this.peerConns[remoteID]?.setRemoteDescription(answerDesc);
    } catch (err) {
      console.log('Failed set answer:', err);
      throw err;
    }
  }

  // Resource cleaning
  clearChat(remoteID: string) {
    this.peerConns[remoteID]?.close();
    delete this.peerConns[remoteID];
    this.channels[remoteID]?.close();
    delete this.channels[remoteID];
  }

  // Handler send message
  async sendMessage(message: Message) {
    const remoteID = message.to_id;
    const channel = this.channels[remoteID];

    // init chat
    try {
      if (!channel) await this.initChat(remoteID);
    } catch (err) {
      console.error('Failed init chat:', err);
      throw err;
    }

    // send message
    try {
      if (channel.readyState === 'open') {
        message.status = 'sent';
        channel.send(JSON.stringify({ type: 'message', message }));
      } else {
        console.log('Push about message:', remoteID);
        SocketManager.sendToAnother(remoteID, 'message', {});
        // await sendPush(remoteID, { type: 'new_message', chatID: message.from_id });
      }
    } catch (err) {
      console.log('Failed send message:', err);
      throw err;
    }

    // save message
    try {
      store.dispatch(addMessageStore(message));
      await addMessageDB(message);
    } catch (err) {
      console.log('Failed save message:', err);
      throw err;
    }
  }

  async sendStatus(remoteID: string, ids: string[], status: StatusMessage) {
    try {
      const channel = this.channels[remoteID];
      if (channel?.readyState === 'open') {
        channel.send(JSON.stringify({ type: 'status', ids, status }));
      } else {
        await sendPush(remoteID, { type: 'status', ids, status });
      }
    } catch (err) {
      console.error('Failed send statuses:', err);
      throw err;
    }
  }

  // **********
  // Getters
  // **********

  getPeerConnByID(remoteID: string) {
    return this.peerConns[remoteID] ?? null;
  }

  getDataChannelByID(remoteID: string) {
    return this.channels[remoteID] ?? null;
  }
}

export const ChatManager = new Chat();
