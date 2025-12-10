import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';

import type { Signaling } from '@/lib/communication/SignalingClient';
import { addMessage } from './handlers/add-message';
import { store } from '@/lib/store';
import { addMessageStore } from '@/lib/store/slices/messages';
import { isChatExists } from './database/handlers/create-chat-db';
import { createChat } from './handlers/create-chat';

export const peerConfig = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302',
      ],
    },
  ],
};

class P2P {
  peerConns: Record<string, RTCPeerConnection> = {};
  dataChannels: Record<string, RTCDataChannel> = {};
  queue: Record<string, JSON[]> = {};
  private signaling: Signaling | null = null;

  setSignaling(signaling: Signaling) {
    this.signaling = signaling;
  }

  connect(remoteID: string) {
    try {
      const peerConn = new RTCPeerConnection(peerConfig);

      peerConn.addEventListener('connectionstatechange', (e) => {
        console.log(`Connection state for ${remoteID}: ${peerConn.connectionState}`);
      });
      peerConn.addEventListener('icecandidate', (e) => {
        if (e.candidate) {
          console.log('Candidate:', e.candidate.candidate);
          this.signaling?.sendIceCandidate(remoteID, e.candidate);
        }
      });
      peerConn.addEventListener('icecandidateerror', (e) => {
        console.log(`Ice candidate failed ${remoteID}`);
      });
      peerConn.addEventListener('iceconnectionstatechange', (e) => {});
      peerConn.addEventListener('icegatheringstatechange', (e) => {});
      peerConn.addEventListener('negotiationneeded', (e) => {});
      peerConn.addEventListener('signalingstatechange', (e) => {});

      peerConn.addEventListener('datachannel', (e) => {
        console.log('Datachannel client');
        this.dataChannels[remoteID] = e.channel;
        this.handleDataChannel(this.dataChannels[remoteID], remoteID);
      });

      this.peerConns[remoteID] = peerConn;
    } catch (err) {
      console.log('Failed p2p connection:', err);
    }
  }

  close(remoteID: string) {
    this.peerConns[remoteID]?.close();
    this.dataChannels[remoteID]?.close();
    delete this.peerConns[remoteID];
    delete this.dataChannels[remoteID];
  }

  async answer(remoteID: string, sdpOffer: string) {
    try {
      await this.peerConns[remoteID].setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdpOffer }));
      const answer = await this.peerConns[remoteID].createAnswer();
      await this.peerConns[remoteID].setLocalDescription(answer);
      this.signaling?.sendAnswer(remoteID, answer.sdp);
    } catch (err) {
      console.error('Failed create answer:', err);
    }
  }

  async setAnswer(remoteID: string, sdpAnswer: string) {
    try {
      await this.peerConns[remoteID].setRemoteDescription(
        new RTCSessionDescription({ type: 'answer', sdp: sdpAnswer }),
      );
    } catch (err) {
      console.log('Failed set answer:', err);
    }
  }

  async offer(peerConn: RTCPeerConnection, remoteID: string) {
    try {
      const offer = await peerConn.createOffer();
      await this.peerConns[remoteID].setLocalDescription(offer);
      this.signaling?.sendOffer(remoteID, offer.sdp);
    } catch (err) {
      console.log('Failed create offer:', err);
    }
  }

  async addIceCandidate(remoteID: string, candidate: RTCIceCandidateInit) {
    try {
      await this.peerConns[remoteID].addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.log('Failed add candidate:', err);
    }
  }

  async initChat(remoteID: string) {
    try {
      const peerConn = new RTCPeerConnection(peerConfig);
      const dataChannel = peerConn?.createDataChannel('chat');
      this.handleDataChannel(dataChannel, remoteID);
      this.peerConns[remoteID] = peerConn;
      this.dataChannels[remoteID] = dataChannel;
      await this.offer(peerConn, remoteID);
      return dataChannel;
    } catch (err) {
      console.log('Failed init chat:', err);
    }
  }

  handleDataChannel(dc: RTCDataChannel, peerID: string) {
    dc.addEventListener('open', () => {
      console.log(`data channel open with ${peerID}`);
      this.queue[peerID].forEach((message) => dc.send(message));
      delete this.queue[peerID];
    });
    dc.addEventListener('close', () => {
      console.log(`data channel close with ${peerID}`);
      delete this.dataChannels[peerID];
    });
    dc.addEventListener('message', async ({ data }) => {
      if (!(await isChatExists(peerID))) await createChat(peerID);
      const message = JSON.parse(data);
      await addMessage({ ...message, chat_id: peerID });
      if (store.getState().messages.chatID === peerID) {
        store.dispatch(addMessageStore(message));
      }
    });
  }
}

export const p2pManager = new P2P();
