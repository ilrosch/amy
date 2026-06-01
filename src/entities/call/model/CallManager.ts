import { mediaDevices, MediaStream, RTCPeerConnection } from 'react-native-webrtc';
import { MEDIA_CONSTRAINTS, SESSION_CONSTRAINTS } from '../config/media';
import { PeerManager } from '@/entities/peer-session/model/PeerManager';
import { ICallSignaling } from '../config/signaling';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import { CallEvent, CallEventType, CallStatus } from '../config/event';

export const CallTimeout = {
  REQUEST: 60_000,
  CONNECTING: 30_000,
} as const;

export interface ICallCallbacks {
  onClose?: () => void;
  onStatusChange?: (status: string) => void;
  onLocalStream?: (stream: MediaStream) => void;
  onRemoteStream?: (stream: MediaStream) => void;
  onRemoteCameraStatusChange?: (enabled: boolean) => void;
  onRemoteAudioStatusChange?: (enabled: boolean) => void;
}

export class CallManager {
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private channel: RTCDataChannel | null = null;

  private closeTimerID: number | null = null;
  private callbacks: ICallCallbacks = {};

  private isEnded = true;

  private _channelEventListeners: {
    onOpen?: () => void;
    onClose?: () => void;
    onMessage?: (e: any) => void;
  } | null = null;

  constructor(
    private peerManager: PeerManager,
    public signaling: ICallSignaling,
  ) {
    this.peerManager.on('datachannel', async ({ peerID, channel }) => {
      if (channel.label !== 'call') return;
      this._handleChannel(peerID, channel);
    });

    this.peerManager.on('connected', async () => {
      this.callbacks?.onStatusChange?.(CallStatus.CONNECTED);
      this._cancelAutoClose();
    });

    this.peerManager.on('close', ({ peerID }) => {
      this.end(peerID);
    });
  }

  setCallback(callbacks: ICallCallbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  async request(peerID: string) {
    try {
      this.isEnded = false;
      this.callbacks?.onStatusChange?.(CallStatus.PENDING);
      await this.initStream();

      this._scheduleAutoClose(peerID, CallTimeout.REQUEST);
      this.signaling.sendSignal(peerID, 'request_call');
    } catch (err) {
      this.isEnded = true;
      console.error('failed to request call:', err);
      throw err;
    }
  }

  async init(peerID: string) {
    this._cancelAutoClose();
    this.callbacks?.onStatusChange?.(CallStatus.CONNECTING);

    try {
      const conn = await this.peerManager.createSession(peerID);
      if (!conn) return;

      const channel = conn.createDataChannel('call');
      this._handleChannel(peerID, channel);

      await this._prepare(peerID, conn);

      await this.peerManager.offer(peerID, SESSION_CONSTRAINTS, 'offer_call');
      this._scheduleAutoClose(peerID, CallTimeout.CONNECTING);
    } catch (err) {
      this.end(peerID);
      console.error('failed to init call:', err);
      throw err;
    }
  }

  async end(peerID: string) {
    if (this.isEnded) return;
    this.isEnded = true;

    this.callbacks?.onClose?.();

    this.callbacks = {};
    this._cancelAutoClose();

    if (this.localStream) {
      this.localStream.getTracks().forEach((t) => t.stop());
      this.localStream = null;
    }

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach((t) => t.stop());
      this.remoteStream = null;
    }

    this._cleanupHandleChannel();
    this._cleanupHandleConn(peerID);

    this.peerManager.closeSession(peerID);
  }

  private async _getLocalStream(): Promise<MediaStream> {
    try {
      const stream = await mediaDevices.getUserMedia(MEDIA_CONSTRAINTS);
      stream.getVideoTracks()[0].enabled = false;
      return stream;
    } catch (err) {
      console.error('failed to get local stream:', err);
      throw err;
    }
  }

  private async _prepare(peerID: string, conn: RTCPeerConnection) {
    try {
      this._handleConn(peerID, conn);

      let localStream = this.localStream;
      if (!localStream) {
        localStream = await this._getLocalStream();
        this.localStream = localStream;
      }

      localStream.getTracks().forEach((track) => {
        const sender = conn.getSenders().find((s) => s.track?.kind === track.kind);

        if (sender) {
          sender.replaceTrack(track);
        } else {
          conn.addTrack(track, localStream);
        }
      });

      this.remoteStream = new MediaStream();
    } catch (err) {
      console.error('failed to prepare call:', err);
      throw err;
    }
  }

  private _scheduleAutoClose(peerID: string, timeout: number) {
    this.closeTimerID = setTimeout(() => {
      this.end(peerID);
    }, timeout);
  }

  private _cancelAutoClose() {
    if (this.closeTimerID) {
      clearTimeout(this.closeTimerID);
      this.closeTimerID = null;
    }
  }

  // ----------
  // connection
  // ----------
  private _handleConn(peerID: string, conn: RTCPeerConnection) {
    if (!conn) return;

    this._cleanupHandleConn(peerID);

    conn.addEventListener('track', this._onRemoteTrack);
  }

  private _cleanupHandleConn(peerID: string) {
    const conn = this.peerManager.getConnection(peerID);
    if (!conn) return;

    conn.removeEventListener('track', this._onRemoteTrack);
  }

  private _onRemoteTrack = async (e: any) => {
    const stream = this.remoteStream;
    if (!stream) return;

    const exist = stream.getTracks().some((t) => t.id === e.track.id);
    if (!exist) {
      stream.addTrack(e.track);
      this.callbacks?.onRemoteStream?.(stream);
    }
  };

  // -------
  // channel
  // -------
  private _handleChannel(peerID: string, channel: RTCDataChannel) {
    if (!channel) return;

    this._cleanupHandleChannel();

    const onOpen = this._onOpenChannel(peerID);
    const onClose = this._onCloseChannel(peerID);
    const onMessage = this._onMessageChannel(peerID);

    channel.addEventListener('open', onOpen);
    channel.addEventListener('close', onClose);
    channel.addEventListener('message', onMessage);

    this._channelEventListeners = { onOpen, onClose, onMessage };
    this.channel = channel;
  }

  private async _cleanupHandleChannel() {
    if (!this.channel) return;
    if (!this._channelEventListeners) return;

    this.channel.removeEventListener('open', this._channelEventListeners.onOpen);
    this.channel.removeEventListener('close', this._channelEventListeners.onClose);
    this.channel.removeEventListener('message', this._channelEventListeners.onMessage);

    this.channel.close();

    this._channelEventListeners = null;
    this.channel = null;
  }

  private _onOpenChannel = (peerID: string) => async () => {
    console.log(`open datachannel "call" with ${peerID}`);
  };

  private _onCloseChannel = (peerID: string) => async () => {
    console.log(`close datachannel "call" with ${peerID}`);
  };

  private _onMessageChannel = (peerID: string) => async (e: any) => {
    try {
      const { type, enabled }: CallEvent = JSON.parse(e.data);

      switch (type) {
        case CallEventType.AUDIO_CHANGED:
          this.callbacks?.onRemoteAudioStatusChange?.(enabled);
          break;
        case CallEventType.CAMERA_CHANGED:
          this.callbacks?.onRemoteCameraStatusChange?.(enabled);
          break;
        case CallEventType.END_CALL:
          this.end(peerID);
          break;
        default:
          console.warn('unknown message from "call":', e.data);
      }
    } catch (err) {
      console.error('failed to handle message from "call":', err);
    }
  };

  // other

  async sendChangeMedia(message: CallEvent) {
    this.channel?.send(JSON.stringify(message));
  }

  async answer(peerID: string, sdp: RTCSessionDescription) {
    try {
      const conn = await this.peerManager.createSession(peerID);
      if (!conn) return;

      await this._prepare(peerID, conn);

      await this.peerManager.answer(peerID, sdp);
    } catch (err) {
      console.error(err);
    }
  }

  async initStream() {
    try {
      this.isEnded = false;
      const stream = await this._getLocalStream();
      this.localStream = stream;
      this.remoteStream = new MediaStream();
      this.callbacks?.onLocalStream?.(stream);
    } catch (err) {
      this.isEnded = true;
      console.error('failed to init local media:', err);
      throw err;
    }
  }
}
