import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

import BaseP2P from './base';
import { mediaConstraints, peerConnConfig, sessionConstraints } from './tokens';

export type CallHandlersType = {
  onStatus: (status: RTCPeerConnectionState) => void;
  onRemoteStream: (stream: MediaStream) => void;
  onRemoteCameraMute: (mute: boolean) => void;
  onRemoteMicroMute: (mute: boolean) => void;
} | null;

class Call extends BaseP2P {
  private peerConn: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private remoteID: string | null = null;
  incomingOffer: string | null = null;

  private callHandlers: CallHandlersType = null;

  // **********
  // Init call
  // **********

  // Outgoing call
  async initCall(remoteID: string, callHandlers: CallHandlersType) {
    try {
      this.remoteID = remoteID;
      await this._prepareCall(remoteID, callHandlers);
      this.dataChannel = this.peerConn?.createDataChannel('call') ?? null;
      this._handleChannel();
      await this._offerByCall(this.peerConn as RTCPeerConnection, remoteID);
    } catch (err) {
      console.log('Failed init call:', err);
      throw err;
    }
  }

  // Init incoming call
  async initIncomingCall(remoteID: string, callHandlers: CallHandlersType) {
    try {
      this.remoteID = remoteID;
      await this._prepareCall(remoteID, callHandlers);
      this.peerConn?.addEventListener('datachannel', (e) => {
        this.dataChannel = e.channel;
        this._handleChannel();
      });
      await this._answerByCall(this.peerConn as RTCPeerConnection, remoteID, this.incomingOffer);
    } catch (err) {
      console.log('Failed init incoming call:', err);
      throw err;
    }
  }

  // **********
  // Call processing and preparing methods
  // **********

  // Preparing to start call
  private async _prepareCall(remoteID: string, callHandlers: CallHandlersType) {
    try {
      // set handlers call
      this.callHandlers = callHandlers;
      // media streams
      const localStream = await this._getLocalStream();
      this.remoteStream = new MediaStream();
      // peer connection
      const peerConn = new RTCPeerConnection(peerConnConfig);
      this._handleCallPeerConn(peerConn, remoteID);
      localStream.getTracks().forEach((track) => {
        peerConn.addTrack(track, localStream);
      });
      this.peerConn = peerConn;
      this.localStream = localStream;
    } catch (err) {
      console.log('Failed prepare call:', err);
      throw err;
    }
  }

  // Preparing channels for call
  private async _handleChannel() {
    try {
      this.dataChannel?.addEventListener('open', () => {
        console.log('open data channel: call');
      });
      this.dataChannel?.addEventListener('close', () => {
        console.log('close data channel: call');
      });
      this.dataChannel?.addEventListener('message', ({ data }) => {
        const { type } = JSON.parse(data);
        switch (type) {
          case 'micro-mute':
            return this.callHandlers?.onRemoteMicroMute(true);
          case 'micro-enable':
            return this.callHandlers?.onRemoteMicroMute(false);
          case 'camera-mute':
            return this.callHandlers?.onRemoteCameraMute(true);
          case 'camera-enable':
            return this.callHandlers?.onRemoteCameraMute(false);
        }
      });
    } catch (err) {
      console.log('Failed create channel for call:', err);
    }
  }

  // Local media tracks (audio + disabled video)
  private async _getLocalStream() {
    try {
      const stream = await mediaDevices.getUserMedia(mediaConstraints);
      stream.getVideoTracks()[0].enabled = false;
      return stream;
    } catch (err) {
      console.log('No permissions:', err);
      throw err;
    }
  }

  // Handlers peer connection
  private _handleCallPeerConn(peerConn: RTCPeerConnection, remoteID: string) {
    peerConn.addEventListener('connectionstatechange', (e) => {
      console.log(peerConn.connectionState);
      switch (
        peerConn.connectionState
        // case 'new':
        //   return onStatusConn('new');
        // case 'connecting':
        //   return onStatusConn('connecting');
        // case 'connected':
        //   return onStatusConn('connected');
        // case 'disconnected':
        //   return onStatusConn('disconnected');
        // case 'failed':
        //   return onStatusConn('failed');

        // case 'connecting':
        //   showToast({ type: 'info', text1: t('toast.conn-ing'), autoHide: false });
        //   break;
        // case 'disconnected':
        //   showToast({ type: 'info', text1: t('toast.re-conn') });
        //   break;
        // case 'connected':
        //   showToast({ type: 'success', text1: t('toast.conn') });
        //   break;
        // case 'failed':
        //   showToast({ type: 'error', text1: '' });
        //   // router.back();
        //   break;
        // case 'new':
        //   showToast({ type: 'info', text1: 'Вызов' });
        // case 'closed':
        //   if (BaseP2P.signaling) {

        //   }
        //   break;
      ) {
      }
    });
    peerConn.addEventListener('icecandidate', (e) => {
      if (e.candidate && BaseP2P.signaling) {
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
      console.log(peerConn.signalingState);
      switch (peerConn.signalingState) {
        case 'have-local-offer':
          return this.callHandlers?.onStatus('new');
        case 'have-remote-offer':
          return this.callHandlers?.onStatus('connecting');
        case 'stable':
          return this.callHandlers?.onStatus('connected');
      }
    });
    peerConn.addEventListener('track', (e) => {
      this.remoteStream?.addTrack(e.track);
      this.callHandlers?.onRemoteStream(this.remoteStream);
    });
  }

  // Create and send offer sdp
  private async _offerByCall(peerConn: RTCPeerConnection, remoteID: string) {
    try {
      const offer = await peerConn.createOffer(sessionConstraints);
      await peerConn.setLocalDescription(offer);
      BaseP2P.signaling?.sendOffer('call', remoteID, offer.sdp);
    } catch (err) {
      console.log('Failed create offer:', err);
      throw err;
    }
  }

  // Create and send answer sdp
  private async _answerByCall(peerConn: RTCPeerConnection, remoteID: string, sdp: string) {
    try {
      const offerDesc = new RTCSessionDescription({ type: 'offer', sdp });
      await peerConn.setRemoteDescription(offerDesc);
      const answer = await peerConn.createAnswer();
      await peerConn.setLocalDescription(answer);
      BaseP2P.signaling?.sendAnswer('call', remoteID, answer.sdp);
    } catch (err) {
      console.log('Failed create answer:', err);
      throw err;
    }
  }

  async sendData(data: { type: string }) {
    try {
      this.dataChannel?.send(JSON.stringify(data));
    } catch (err) {
      console.log('Failed send message:', err);
    }
  }

  async addIceCandidate(candidate: RTCIceCandidateInit) {
    try {
      await this.peerConn?.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.log('Failed add candidate:', err);
    }
  }

  // Set remote sdp (answer)
  async setAnswerByCall(sdp: string) {
    try {
      const answerDesc = new RTCSessionDescription({ type: 'answer', sdp });
      await this.peerConn?.setRemoteDescription(answerDesc);
    } catch (err) {
      console.log('Failed set answer:', err);
      throw err;
    }
  }

  sendEndCall() {
    if (!BaseP2P.signaling) return;
    BaseP2P.signaling?.sendClose(this.remoteID);
  }

  // Resource cleaning after call
  clearCall() {
    this.localStream?.getTracks().map((track) => track.stop());
    this.peerConn?.close();
    this.peerConn = null;
    this.dataChannel?.close();
    this.dataChannel = null;
    this.localStream = null;
    this.remoteStream = null;
    this.remoteID = null;
    this.incomingOffer = null;
    this.callHandlers = null;
  }

  // ***********
  // Getters
  // ***********
  getCurrentPeerConn() {
    return this.peerConn;
  }

  getCurrentLocalStream() {
    return this.localStream;
  }

  getCurrentRemoteStream() {
    return this.remoteStream;
  }

  getCurrentChannel() {
    return this.dataChannel;
  }
}

export const CallManager = new Call();
