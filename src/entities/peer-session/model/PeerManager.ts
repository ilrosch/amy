import { RTCIceCandidate, RTCPeerConnection } from 'react-native-webrtc';
import { RTCOfferOptions } from 'react-native-webrtc/lib/typescript/RTCUtil';
import { store } from '@/app-root/store';
import { contactApi } from '@/entities/Contact';
import { IPeerSignaling } from '../config/signaling';
import { CONNECTION_CONFIG } from '../config/connection';
import { PeerEventHandler, PeerEvents } from '../config/events';

export interface IConnEventListener {
  onDataChannel?: (e: any) => void;
  onConnectionStateChange?: (e: any) => void;
  onNegotiationNeeded?: (e: any) => void;
  onIceCandidate?: (e: any) => void;
  onSignalingStateChange?: (e: any) => void;
}

export type PeerSession = {
  connection: RTCPeerConnection;
  iceBuffer: RTCIceCandidate[];
};

export class PeerManager {
  private sessions = new Map<string, PeerSession>();
  private eventHandlers = new Map<keyof PeerEvents, Set<PeerEventHandler<any>>>();
  private _connEventListeners = new Map<string, IConnEventListener>();

  constructor(private signaling: IPeerSignaling) {}

  on<T extends keyof PeerEvents>(event: T, handler: PeerEventHandler<T>) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }

    this.eventHandlers.get(event)!.add(handler);
  }

  off<T extends keyof PeerEvents>(event: T, handler: PeerEventHandler<T>) {
    this.eventHandlers.get(event)?.delete(handler);
  }

  private _emit<T extends keyof PeerEvents>(event: T, data: PeerEvents[T]): void {
    this.eventHandlers.get(event)?.forEach((handler) => handler(data));
  }

  private _getSession(peerID: string): PeerSession | undefined {
    return this.sessions.get(peerID);
  }

  private _isDeadConn(conn: RTCPeerConnection): boolean {
    return ['closed', 'failed'].includes(conn.connectionState);
  }

  private async _isPeerOnline(peerID: string): Promise<boolean> {
    try {
      const result = await store.dispatch(contactApi.endpoints.isOnline.initiate(peerID)).unwrap();
      return result.status === 'online';
    } catch (err) {
      return false;
    }
  }

  getConnection(peerID: string): RTCPeerConnection | null {
    const session = this._getSession(peerID);
    if (!session) return null;

    const conn = session.connection;
    if (!conn) return null;

    return this._isDeadConn(conn) ? null : conn;
  }

  getIceBuffer(peerID: string): RTCIceCandidate[] | null {
    const session = this._getSession(peerID);
    if (!session) return null;

    const buffer = session.iceBuffer;
    if (!buffer) return null;

    return buffer;
  }

  async createSession(peerID: string): Promise<RTCPeerConnection | null> {
    try {
      const existConn = this.getConnection(peerID);
      if (existConn) return existConn;

      this.closeSession(peerID);

      const isOnline = await this._isPeerOnline(peerID);

      if (!isOnline) return null;

      const conn = new RTCPeerConnection(CONNECTION_CONFIG);
      this.sessions.set(peerID, {
        connection: conn,
        iceBuffer: [],
      });

      this._handleConn(peerID, conn);

      return conn;
    } catch (err) {
      console.error('failed to create peer session:', err);
      throw err;
    }
  }

  closeSession(peerID: string) {
    const session = this._getSession(peerID);
    if (session) {
      this._cleanupHandleConn(peerID, session.connection);
      session.connection.close();
      this.sessions.delete(peerID);
    }
  }

  async offer(
    peerID: string,
    options?: RTCOfferOptions,
    variant: 'offer' | 'offer_call' = 'offer',
  ): Promise<void> {
    try {
      const conn = await this.createSession(peerID);
      if (conn) {
        const offer = await conn.createOffer(options);
        await conn.setLocalDescription(offer);

        switch (variant) {
          case 'offer':
            this.signaling.sendOffer(peerID, offer);
            break;
          case 'offer_call':
            this.signaling.sendOfferCall(peerID, offer);
            break;
        }
      }
    } catch (err) {
      console.error('failed to create offer:', err);
      throw err;
    }
  }

  async answer(peerID: string, sdp: RTCSessionDescription): Promise<void> {
    try {
      const conn = await this.createSession(peerID);

      if (conn) {
        await this.setRemoteSDP(peerID, sdp);

        const answer = await conn.createAnswer();
        await conn.setLocalDescription(answer);
        this.signaling.sendAnswer(peerID, answer);
      }
    } catch (err) {
      console.error('failed to create answer:', err);
      throw err;
    }
  }

  async setRemoteSDP(peerID: string, sdp: RTCSessionDescription): Promise<void> {
    try {
      const conn = this.getConnection(peerID);
      if (conn) {
        await conn.setRemoteDescription(sdp);
      }
    } catch (err) {
      console.error('failed to set remote sdp:', err);
      throw err;
    }
  }

  async iceCandidate(peerID: string, candidate: RTCIceCandidate): Promise<void> {
    try {
      const session = this._getSession(peerID);
      if (!session) return;

      const conn = this.getConnection(peerID);
      if (!conn) {
        session.iceBuffer.push(candidate);
        return;
      }

      await conn.addIceCandidate(candidate);
    } catch (err) {
      console.error('failed to add ice candidate:', err);
      throw err;
    }
  }

  private _addIceCandidateFromBuffer(peerID: string) {
    try {
      const buffer = this.getIceBuffer(peerID);
      if (buffer) {
        buffer.forEach(async (c) => {
          await this.iceCandidate(peerID, c);
        });

        this._cleanupIceBuffer(peerID);
      }
    } catch (err) {
      console.error('failed to add candidate from buffer:', err);
      throw err;
    }
  }

  private _cleanupIceBuffer(peerID: string) {
    const session = this._getSession(peerID);
    if (!session) return;

    session.iceBuffer = [];
  }

  private _createConnListeners = (peerID: string, conn: RTCPeerConnection): IConnEventListener => ({
    onDataChannel: this._onDataChannel(peerID),
    onIceCandidate: this._onIceCandidate(peerID),
    onNegotiationNeeded: this._onNegotiationNeeded(peerID),
    onSignalingStateChange: this._onSignalingStateChange(peerID, conn),
    onConnectionStateChange: this._onConnectionStateChange(peerID, conn),
  });

  private _handleConn(peerID: string, conn: RTCPeerConnection) {
    if (!conn) return;

    this._cleanupHandleConn(peerID, conn);

    const listeners = this._createConnListeners(peerID, conn);
    this._connEventListeners.set(peerID, listeners);

    conn.addEventListener('datachannel', listeners.onDataChannel);
    conn.addEventListener('connectionstatechange', listeners.onConnectionStateChange);
    conn.addEventListener('negotiationneeded', listeners.onNegotiationNeeded);
    conn.addEventListener('icecandidate', listeners.onIceCandidate);
    conn.addEventListener('signalingstatechange', listeners.onSignalingStateChange);
  }

  private _cleanupHandleConn(peerID: string, conn: RTCPeerConnection) {
    if (!conn) return;

    const listeners = this._connEventListeners.get(peerID);
    if (!listeners) return;

    conn.removeEventListener('datachannel', listeners.onDataChannel);
    conn.removeEventListener('connectionstatechange', listeners.onConnectionStateChange);
    conn.removeEventListener('icecandidate', listeners.onIceCandidate);
    conn.removeEventListener('negotiationneeded', listeners.onNegotiationNeeded);
    conn.removeEventListener('signalingstatechange', listeners.onSignalingStateChange);

    this._connEventListeners.delete(peerID);
  }

  private _onDataChannel = (peerID: string) => async (e: any) => {
    this._emit('datachannel', { peerID, channel: e.channel });
  };

  private _onConnectionStateChange =
    (peerID: string, conn: RTCPeerConnection) => async (e: any) => {
      const state = conn.connectionState;
      this._emit('connectionstatechange', { peerID, state });
      if (state === 'closed' || state === 'failed') {
        this._emit('close', { peerID });
      }
    };

  private _onNegotiationNeeded = (peerID: string) => async (e: any) => {
    this._emit('negotiationneeded', { peerID });
  };

  private _onIceCandidate = (peerID: string) => async (e: any) => {
    if (e.candidate) {
      this.signaling.sendIceCandidate(peerID, e.candidate);
    }
  };

  private _onSignalingStateChange = (peerID: string, conn: RTCPeerConnection) => async (e: any) => {
    switch (conn.signalingState) {
      case 'have-remote-offer':
        this._addIceCandidateFromBuffer(peerID);
        break;
      case 'stable':
        this._emit('connected', { peerID });
        break;
    }
  };
}
