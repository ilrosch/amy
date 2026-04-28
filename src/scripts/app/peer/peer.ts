import { RTCPeerConnection } from 'react-native-webrtc';
import { peerConnConfig } from './tokens';
import { CallStatus, Signaling } from './signaling';
import { PeerEventHandler, PeerEvents } from './events';
import { statusContact } from '../handlers/contact/status';

export default class PeerManager {
  private connections = new Map<string, RTCPeerConnection>();
  private iceBuffer = new Map<string, RTCIceCandidate[]>();
  private handlers = new Map<keyof PeerEvents, Set<PeerEventHandler<any>>>();

  constructor(private signaling: Signaling) {}

  on<T extends keyof PeerEvents>(event: T, handler: PeerEventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  off<T extends keyof PeerEvents>(event: T, handler: PeerEventHandler<T>): void {
    this.handlers.get(event)?.delete(handler);
  }

  private emit<T extends keyof PeerEvents>(event: T, data: PeerEvents[T]): void {
    this.handlers.get(event)?.forEach((handler) => handler(data));
  }

  async createConn(peerID: string): Promise<RTCPeerConnection> {
    try {
      const existConn = this.connections.get(peerID);
      if (existConn) {
        if (existConn.connectionState === 'closed' || existConn.connectionState === 'failed') {
          this.closeConn(peerID);
        } else {
          return existConn;
        }
      }

      const isOnline = await this.isOnlineUser(peerID);
      if (!isOnline) throw Error('user is offline');

      const conn = new RTCPeerConnection(peerConnConfig);
      this.iceBuffer.set(peerID, []);
      this.connections.set(peerID, conn);
      this._handleConn(peerID, conn);
      return conn;
    } catch (err) {
      console.error('failed to create connection:', err);
      throw err;
    }
  }

  async offer(peerID: string, options?: RTCOfferOptions): Promise<void> {
    try {
      const conn = await this.createConn(peerID);
      const offer = await conn.createOffer(options);
      await conn.setLocalDescription(offer);
      this.signaling.sendOffer(peerID, offer);
    } catch (err) {
      console.error('failed to create offer:', err);
      throw err;
    }
  }

  async answer(peerID: string, sdp: RTCSessionDescription): Promise<void> {
    try {
      const conn = await this.createConn(peerID);
      this.emit('answer_call', { peerID });
      await conn.setRemoteDescription(sdp);
      const answer = await conn.createAnswer();
      await conn.setLocalDescription(answer);
      this.signaling.sendAnswer(peerID, answer);
      this.fetchIceCandidate(peerID);
    } catch (err) {
      console.error('failed to create answer:', err);
      throw err;
    }
  }

  async fetchIceCandidate(peerID: string) {
    try {
      console.log('buffer', this.iceBuffer.get(peerID));
      this.iceBuffer.get(peerID)?.forEach(async (candidate) => {
        await this.iceCandidate(peerID, candidate);
      });
      this.iceBuffer.clear();
    } catch (err) {
      console.error('failed fetch ice candidate:', err)
    }
  }

  async iceCandidate(peerID: string, candidate: RTCIceCandidate): Promise<void> {
    try {
      const conn = this.connections.get(peerID);
      if (!conn) {
        this.iceBuffer.get(peerID)?.push(candidate);
        return;
      }
      await conn.addIceCandidate(candidate);
    } catch (err) {
      console.error('failed add ice_candidate:', err);
      // throw err;
    }
  }

  async setRemoteSDP(peerID: string, sdp: RTCSessionDescription): Promise<void> {
    try {
      const conn = this.getConn(peerID);
      await conn.setRemoteDescription(sdp);
      this.fetchIceCandidate(peerID);
    } catch (err) {
      console.error('failed set remote sdp:', err);
      throw err;
    }
  }

  private _handleConn(peerID: string, conn: RTCPeerConnection) {
    conn.addEventListener('connectionstatechange', () => {
      const connState = conn.connectionState;
      this.emit('connectionstatechange', { peerID, state: connState });
      if (connState === 'closed' || connState === 'failed') {
        this.emit('close', { peerID });
      }
    });

    conn.addEventListener('icecandidate', (e) => {
      if (e.candidate) {
        this.signaling.sendIceCandidate(peerID, e.candidate);
      }
    });

    conn.addEventListener('datachannel', (e) => {
      this.emit('datachannel', { peerID, channel: e.channel });
    });

    conn.addEventListener('negotiationneeded', () => {
      this.emit('negotiationneeded', { peerID });
    });

    // conn.addEventListener('negotiationneeded', (e) => {
    //   console.log('Negotiation ', e);
    // });

    // conn.addEventListener('signalingstatechange', (e) => {
    //   console.log('Signal', conn.signalingState);
    // });
  }

  async isOnlineUser(peerID: string): Promise<boolean> {
    return statusContact(peerID);
  }

  closeConn(peerID: string) {
    try {
      const conn = this.connections.get(peerID);
      if (conn) {
        conn.close();
        this.connections.delete(peerID);
        this.iceBuffer.delete(peerID);
        this.emit('close', { peerID });
      }
    } catch (err) {
      console.error('failed to close connection:', err);
      throw err;
    }
  }

  getConn(peerID: string) {
    const conn = this.connections.get(peerID);

    if (!conn) throw new Error(`connection with ${peerID} not found`);
    if (conn.connectionState === 'closed' || conn.connectionState === 'failed') {
      throw new Error(`connection with ${peerID} is ${conn.connectionState}`);
    }

    return conn;
  }

  sendServer(message) {
    this.signaling.sendMessage(message);
  }

  sendStatusCall(peerID: string, status: CallStatus) {
    this.signaling.sendStatusCall(peerID, status);
  }
}

export const createPeerManager = (signaling: Signaling) => new PeerManager(signaling);
