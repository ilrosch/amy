import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
  MediaStream,
} from 'react-native-webrtc';

import type { Signaling } from '@/lib/communication/SignalingClient';
import { addMessage } from './handlers/add-message';
import { store } from '@/lib/store';
import { addMessageStore } from '@/lib/store/slices/messages';
import { isChatExists } from './database/handlers/create-chat-db';
import { createChat } from './handlers/create-chat';
import { router } from 'expo-router';
import { showToast } from './toast';
import { i18nextInstance } from '@/lib/i18n';

// export const peerConfig = {
//   iceServers: [
//     {
//       urls: [
//         'stun:stun.l.google.com:19302',
//         'stun:stun1.l.google.com:19302',
//         'stun:stun2.l.google.com:19302',
//         'stun:stun3.l.google.com:19302',
//         'stun:stun4.l.google.com:19302',
//       ],
//     },
//   ],
// };

// export const mediaConstraints = {
//   audio: true,
//   video: {
//     frameRate: 30,
//     facingMode: 'user',
//   },
// };

// const sessionConstraints: RTCOfferOptions = {
//   iceRestart: true,
//   offerToReceiveAudio: true,
//   offerToReceiveVideo: true,
// };

// const { t } = i18nextInstance;

class P2P {
  // peerConns: Record<string, RTCPeerConnection> = {};
  // dataChannels: Record<string, RTCDataChannel> = {};
  // callConn: RTCPeerConnection | null = null;
  // queue: Record<string, JSON[]> = {};
  // private signaling: Signaling | null = null;
  // localStream: MediaStream | null = null;
  // remoteStream: MediaStream | null = null;
  // callOffer: string | null = null;
  // setSignaling(signaling: Signaling) {
  //   this.signaling = signaling;
  // }
  // connect(remoteID: string) {
  //   try {
  //     const peerConn = new RTCPeerConnection(peerConfig);
  //     peerConn.addEventListener('connectionstatechange', (e) => {
  //       console.log(`Connection state for ${remoteID}: ${peerConn.connectionState}`);
  //     });
  //     peerConn.addEventListener('icecandidate', (e) => {
  //       if (e.candidate) {
  //         console.log('Candidate:', e.candidate.candidate);
  //         this.signaling?.sendIceCandidate(remoteID, e.candidate);
  //       }
  //     });
  //     peerConn.addEventListener('icecandidateerror', (e) => {
  //       console.log(`Ice candidate failed ${remoteID}`);
  //     });
  //     peerConn.addEventListener('iceconnectionstatechange', (e) => {});
  //     peerConn.addEventListener('icegatheringstatechange', (e) => {});
  //     peerConn.addEventListener('negotiationneeded', (e) => {});
  //     peerConn.addEventListener('signalingstatechange', (e) => {});
  //     peerConn.addEventListener('datachannel', (e) => {
  //       console.log('Datachannel client');
  //       this.dataChannels[remoteID] = e.channel;
  //       this.handleDataChannel(this.dataChannels[remoteID], remoteID);
  //     });
  //     this.peerConns[remoteID] = peerConn;
  //   } catch (err) {
  //     console.log('Failed p2p connection:', err);
  //   }
  // }
  // close(remoteID: string) {
  //   this.peerConns[remoteID]?.close();
  //   this.dataChannels[remoteID]?.close();
  //   delete this.peerConns[remoteID];
  //   delete this.dataChannels[remoteID];
  // }
  // async answer(remoteID: string, sdpOffer: string) {
  //   try {
  //     await this.peerConns[remoteID].setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdpOffer }));
  //     const answer = await this.peerConns[remoteID].createAnswer();
  //     console.log(answer);
  //     await this.peerConns[remoteID].setLocalDescription(answer);
  //     this.signaling?.sendAnswer(remoteID, answer.sdp);
  //   } catch (err) {
  //     console.error('Failed create answer:', err);
  //   }
  // }
  // async setAnswer(remoteID: string, sdpAnswer: string) {
  //   try {
  //     await this.peerConns[remoteID].setRemoteDescription(
  //       new RTCSessionDescription({ type: 'answer', sdp: sdpAnswer }),
  //     );
  //     console.log(sdpAnswer);
  //   } catch (err) {
  //     console.log('Failed set answer:', err);
  //   }
  // }
  // async offer(remoteID: string, config: RTCOfferOptions = {}) {
  //   try {
  //     const offer = await this.peerConns[remoteID].createOffer(config);
  //     await this.peerConns[remoteID].setLocalDescription(offer);
  //     this.signaling?.sendOffer(remoteID, offer.sdp);
  //   } catch (err) {
  //     console.log('Failed create offer:', err);
  //   }
  // }
  // async initChat(remoteID: string) {
  //   try {
  //     const peerConn = new RTCPeerConnection(peerConfig);
  //     const dataChannel = peerConn?.createDataChannel('chat');
  //     this.handleDataChannel(dataChannel, remoteID);
  //     this.peerConns[remoteID] = peerConn;
  //     this.dataChannels[remoteID] = dataChannel;
  //     await this.offer(peerConn, remoteID);
  //     return dataChannel;
  //   } catch (err) {
  //     console.log('Failed init chat:', err);
  //   }
  // }
  // // Calls
  // // Init outgoing call
  // async initCall(remoteID: string, onRemoteStream: (stream: MediaStream) => void) {
  //   try {
  //     await this._prepareCall(remoteID, onRemoteStream);
  //     await this._offerByCall(this.callConn, remoteID);
  //   } catch (err) {
  //     console.log('Failed init call:', err);
  //     throw err;
  //   }
  // }
  // // Init incoming call
  // async initIncomingCall(remoteID: string, onRemoteStream: (stream: MediaStream) => void) {
  //   try {
  //     await this._prepareCall(remoteID, onRemoteStream);
  //     await this._answerByCall(this.callConn, remoteID, this.callOffer);
  //   } catch (err) {
  //     console.log('Failed reply call:', err);
  //   }
  // }
  // // Handlers peer connection
  // private _handleCallPeerConn(peerConn: RTCPeerConnection, remoteID: string) {
  //   peerConn.addEventListener('connectionstatechange', (e) => {
  //     switch (peerConn.connectionState) {
  //       case 'connecting':
  //         showToast({ type: 'info', text1: t('toast.conn-ing'), autoHide: false });
  //         break;
  //       case 'disconnected':
  //         showToast({ type: 'info', text1: t('toast.re-conn') });
  //         break;
  //       case 'connected':
  //         showToast({ type: 'success', text1: t('toast.conn') });
  //         break;
  //       case 'failed':
  //         showToast({ type: 'error', text1: '' });
  //         router.back();
  //         break;
  //       case 'new':
  //         showToast({ type: 'info', text1: 'Вызов' });
  //       case 'closed':
  //         this.signaling?.sendClose(remoteID);
  //         break;
  //     }
  //   });
  //   peerConn.addEventListener('icecandidate', (e) => {
  //     if (e.candidate) {
  //       console.log('Candidate:', e.candidate.candidate);
  //       this.signaling?.sendIceCandidate(remoteID, e.candidate);
  //     }
  //   });
  //   peerConn.addEventListener('icecandidateerror', (e) => {
  //     console.log(`Ice candidate failed ${remoteID}`);
  //   });
  //   peerConn.addEventListener('negotiationneeded', (e) => {
  //     console.log('Negotition ', e);
  //   });
  //   peerConn.addEventListener('signalingstatechange', (e) => {
  //     console.log('Signal', peerConn.signalingState);
  //   });
  // }
  // // Local media tracks (audio + disabled video)
  // private async _getLocalStream() {
  //   try {
  //     const stream = await mediaDevices.getUserMedia(mediaConstraints);
  //     stream.getVideoTracks()[0].enabled = false;
  //     return stream;
  //   } catch (err) {
  //     console.log('No permissions:', err);
  //     throw err;
  //   }
  // }
  // // Create and send offer sdp
  // private async _offerByCall(peerConn: RTCPeerConnection, remoteID: string) {
  //   try {
  //     const offer = await peerConn.createOffer(sessionConstraints);
  //     await peerConn.setLocalDescription(offer);
  //     this.signaling?.sendOffer('call', remoteID, offer.sdp);
  //   } catch (err) {
  //     console.log('Failed create offer:', err);
  //     throw err;
  //   }
  // }
  // // Create and send answer sdp
  // private async _answerByCall(peerConn: RTCPeerConnection, remoteID: string, sdp: string) {
  //   try {
  //     const offerDesc = new RTCSessionDescription({ type: 'offer', sdp });
  //     await peerConn.setRemoteDescription(offerDesc);
  //     const answer = await peerConn.createAnswer();
  //     await peerConn.setLocalDescription(answer);
  //     this.signaling?.sendAnswer('call', remoteID, answer.sdp);
  //   } catch (err) {
  //     console.log('Failed create answer:', err);
  //     throw err;
  //   }
  // }
  // // Set remote sdp (answer)
  // async setAnswerByCall(sdp: string) {
  //   try {
  //     const answerDesc = new RTCSessionDescription({ type: 'answer', sdp });
  //     await this.callConn?.setRemoteDescription(answerDesc);
  //   } catch (err) {
  //     console.log('Failed set answer:', err);
  //     throw err;
  //   }
  // }
  // // Preparing to start call
  // private async _prepareCall(remoteID: string, onRemoteStream: (stream: MediaStream) => void) {
  //   try {
  //     // media streams
  //     const localStream = await this._getLocalStream();
  //     const remoteStream = new MediaStream();
  //     // peer connection
  //     const peerConn = new RTCPeerConnection(peerConfig);
  //     this._handleCallPeerConn(peerConn, remoteID);
  //     peerConn.addEventListener('track', (e) => {
  //       remoteStream.addTrack(e.track);
  //       onRemoteStream(remoteStream);
  //     });
  //     localStream.getTracks().forEach((track) => {
  //       peerConn.addTrack(track, localStream);
  //     });
  //     this.callConn = peerConn;
  //     this.localStream = localStream;
  //     this.remoteStream = remoteStream;
  //   } catch (err) {
  //     console.log('Failed prepare call:', err);
  //     throw err;
  //   }
  // }
  // clearCall() {
  //   this.localStream?.getTracks().map((track) => track.stop());
  //   this.callConn?.close();
  //   this.callConn = null;
  //   this.localStream = null;
  //   this.remoteStream = null;
  //   this.callOffer = null;
  // }
}

export const p2pManager = new P2P();
