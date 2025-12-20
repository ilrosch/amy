import { RTCPeerConnection } from 'react-native-webrtc';
import BaseP2P from './base';
import { peerConnConfig } from './tokens';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';

class Chat extends BaseP2P {
  private peerConns: Record<string, RTCPeerConnection> = {};
  private dataChannels: Record<string, RTCDataChannel> = {};
  // queue: Record<string, JSON[]> = {};

  // **********
  // Init chat
  // **********
  async initChat(remoteID: string) {
    try {
      const peerConn = new RTCPeerConnection(peerConnConfig);
      this._handlePeerConn(peerConn, remoteID);
      const dataChannel = peerConn?.createDataChannel('chat');
      this._handleDataChannel(dataChannel, remoteID);
      await this._offer(peerConn, remoteID);
      this.peerConns[remoteID] = peerConn;
      this.dataChannels[remoteID] = dataChannel;
    } catch (err) {
      console.log('Failed init chat:', err);
      throw err;
    }
  }

  async initReceiveChat(remoteID: string, sdp: string) {
    try {
      const peerConn = new RTCPeerConnection(peerConnConfig);
      this._handlePeerConn(peerConn, remoteID);
      peerConn.addEventListener('datachannel', (e) => {
        this.dataChannels[remoteID] = e.channel;
        this._handleDataChannel(e.channel, remoteID);
      });
      await this._answer(peerConn, remoteID, sdp);
      this.peerConns[remoteID] = peerConn;
    } catch (err) {
      console.log('Failed init chat:', err);
    }
  }

  // **********
  // Chat processing and preparing methods
  // **********

  private _handlePeerConn(peerConn: RTCPeerConnection, remoteID: string) {
    peerConn.addEventListener('connectionstatechange', (e) => {
      console.log('Change state: ', peerConn.connectionState, remoteID);
    });
    peerConn.addEventListener('icecandidate', (e) => {
      if (e.candidate) {
        BaseP2P.signaling?.sendIceCandidate(remoteID, e.candidate);
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

  private _handleDataChannel(dc: RTCDataChannel, remoteID: string) {
    // dc.addEventListener('open', () => {
    //   console.log(`data channel open with ${remoteID}`);
    //   this.queue[remoteID].forEach((message) => dc.send(message));
    //   delete this.queue[remoteID];
    // });
    // dc.addEventListener('close', () => {
    //   console.log(`data channel close with ${remoteID}`);
    //   delete this.dataChannels[remoteID];
    // });
    // dc.addEventListener('message', async ({ data }) => {
    //   if (!(await isChatExists(remoteID))) await createChat(remoteID);
    //   const message = JSON.parse(data);
    //   await addMessage({ ...message, chat_id: remoteID });
    //   if (store.getState().messages.chatID === remoteID) {
    //     store.dispatch(addMessageStore(message));
    //   }
    // });
  }

  // Create and send offer sdp
  private async _offer(peerConn: RTCPeerConnection, remoteID: string) {
    try {
      const offer = await peerConn.createOffer();
      await peerConn.setLocalDescription(offer);
      BaseP2P.signaling?.sendOffer('chat', remoteID, offer.sdp);
    } catch (err) {
      console.log('Failed create offer:', err);
      throw err;
    }
  }

  // Create and send answer sdp
  private async _answer(peerConn: RTCPeerConnection, remoteID: string, sdp: string) {
    try {
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
  private async addIceCandidate(remoteID: string, candidate: RTCIceCandidateInit) {
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
    this.dataChannels[remoteID]?.close();
    delete this.dataChannels[remoteID];
  }

  // **********
  // Getters
  // **********

  getPeerConnByID(remoteID: string) {
    return this.peerConns[remoteID] ?? null;
  }

  getDataChannelByID(remoteID: string) {
    return this.dataChannels[remoteID] ?? null;
  }
}

export const ChatManager = new Chat();
