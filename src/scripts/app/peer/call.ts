import { mediaDevices, MediaStream } from 'react-native-webrtc';
import PeerManager from './peer';
import { mediaConstraints, sessionConstraints } from './tokens';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';

export enum CallTimeout {
  REQUEST = 60_000_000,
  CONNECTING = 30_000,
}

export enum CallStatus {
  PENDING = 'call.status-pending',
  CONNECTING = 'call.status-connecting',
  RECONNECTING = 'call.status-reconnecting',
  CONNECTED = 'call.status-connected',
}

export enum MediaEventType {
  CAMERA_CHANGED = 'camera_changed_event',
  AUDIO_CHANGED = 'audio_changed_event',
  END_CALL = 'end_call_event',
}

export type MediaEvent = {
  type: MediaEventType;
  enabled: boolean;
};

export interface CallCallbacks {
  onClose?: () => void;
  onStatusChange?: (status: CallStatus) => void;
  onLocalStream?: (stream: MediaStream) => void;
  onRemoteStream?: (stream: MediaStream) => void;
  onRemoteCameraStatusChange?: (enabled: boolean) => void;
  onRemoteAudioStatusChange?: (enabled: boolean) => void;
}

export default class CallManager {
  // private isBusy: boolean = false;
  private callbacks: CallCallbacks = {};

  private _closeTimerID: number | null = null;
  private channel: RTCDataChannel | null = null;

  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;

  constructor(private peerManager: PeerManager) {
    this.peerManager.on('datachannel', ({ peerID, channel }) => {
      this._handleIncomingChannel(peerID, channel);
    });

    // this.peerManager.on('close', ({ peerID }) => {
    //   this.channel = null;
    // });

    this.peerManager.on('answer_call', async ({ peerID }) => this._prepareCall(peerID));
  }

  setCallbacks(callbacks: CallCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  async request(peerID: string) {
    try {
      // this.isBusy = true;
      this.callbacks?.onStatusChange?.(CallStatus.PENDING);
      this.localStream = await this._getLocalStream();
      this.callbacks?.onLocalStream?.(this.localStream);
      this._scheduleAutoClose(peerID, CallTimeout.REQUEST);
      this.peerManager.sendStatusCall(peerID, 'request_call');
    } catch (err) {
      console.error('failed to request call:', err);
      // this.isBusy = false;
    }
  }

  async init(peerID: string) {
    try {
      this._cancelAutoClose();
      this.callbacks?.onStatusChange?.(CallStatus.CONNECTING);

      const conn = await this.peerManager.createConn(peerID);

      const channel = conn.createDataChannel('call');
      this._handleChannel(channel);
      this.channel = channel;

      await this._prepareCall(peerID);

      await this.peerManager.offer(peerID, sessionConstraints);
      this._scheduleAutoClose(peerID, CallTimeout.CONNECTING);
    } catch (err) {
      console.error('failed to init call:', err);
      this.callbacks?.onClose?.();
      throw err;
    }
  }

  private _scheduleAutoClose(peerID: string, timeout: number) {
    this._closeTimerID = setTimeout(() => this.callbacks?.onClose?.(), timeout);
  }

  private _cancelAutoClose() {
    if (this._closeTimerID) {
      clearTimeout(this._closeTimerID);
      this._closeTimerID = null;
    }
  }

  private async _handleIncomingChannel(peerID: string, channel: RTCDataChannel): Promise<void> {
    if (channel.label !== 'call') return;

    this.channel = channel;
    this._handleChannel(channel);
  }

  private _handleChannel(channel: RTCDataChannel): void {
    channel.addEventListener('open', this._handleOpenChannel);
    channel.addEventListener('close', this._handleCloseChannel);
    channel.addEventListener('message', this._handleMessageChannel);
    channel.addEventListener('error', this._handleErrorChannel);
  }

  private _cleanupChannel(): void {
    this.channel?.removeEventListener('open', this._handleOpenChannel);
    this.channel?.removeEventListener('close', this._handleCloseChannel);
    this.channel?.removeEventListener('message', this._handleMessageChannel);
    this.channel?.removeEventListener('error', this._handleErrorChannel);
    this.channel = null;
  }

  private _handleOpenChannel = async (e: any): Promise<void> => {
    console.log('open channel');
  };

  private _handleCloseChannel = async (e: any): Promise<void> => {
    console.log('close channel');
  };

  private _handleErrorChannel = async (err: any): Promise<void> => {
    console.error('error channel:', err);
  };

  private _handleMessageChannel = async (e: any): Promise<void> => {
    try {
      const { type, enabled }: MediaEvent = JSON.parse(e.data);
      switch (type) {
        case MediaEventType.CAMERA_CHANGED:
          this.callbacks?.onRemoteCameraStatusChange?.(enabled);
          break;
        case MediaEventType.AUDIO_CHANGED:
          this.callbacks?.onRemoteAudioStatusChange?.(enabled);
          break;
        case MediaEventType.END_CALL:
          this.callbacks?.onClose?.();
          break;
        default:
          console.warn('unknown media event type:', type);
      }
    } catch (err) {
      console.error('failed to parse channel message:', err);
    }
  };

  async send(type: MediaEventType, enabled?: boolean) {
    this.channel?.send(JSON.stringify({ type, enabled }));
  }

  async close(peerID: string) {
    console.log('close call', this.peerManager.getConn(peerID));
    this.peerManager.closeConn(peerID);
    // this.isBusy = false;
    this.callback = {};
    this._closeTimerID = null;
    this.localStream = null;
    this.remoteStream = null;

    this._cleanupChannel();
  }

  private async _prepareCall(peerID: string): Promise<void> {
    try {
      const conn = this.peerManager.getConn(peerID);

      conn.addEventListener('iceconnectionstatechange', async () => {
        if (conn.iceConnectionState === 'failed') {
          console.log('restart ice');
          conn.restartIce();
        }
      });

      // conn.addEventListener('negotiationneeded', async () => {
      //   if (conn.iceConnectionState !== 'failed') return;

      //   console.log('Попытка воставки соединения!');
      //   this._scheduleAutoClose(peerID, CallTimeout.CONNECTING);
      //   this.callbacks?.onStatusChange?.(CallStatus.RECONNECTING);

      //   const reconnect = async (ament = 1) => {
      //     if (ament === 5) {
      //       this.callbacks?.onClose?.();
      //       return;
      //     }

      //     try {
      //       console.log('Попытка', ament);
      //       await this.peerManager.offer(peerID, sessionConstraints);
      //     } catch (err) {
      //       setTimeout(() => reconnect(ament + 1), 6_000);
      //     }
      //   };

      //   try {
      //     await reconnect();
      //   } catch (err) {}
      // });

      const localStream = await this._getLocalStream();
      localStream.getTracks().forEach((track) => {
        conn.addTrack(track, localStream);
      });

      this.localStream = localStream;
      this.remoteStream = new MediaStream();
      this.callbacks?.onLocalStream?.(localStream);

      conn.addEventListener('track', (e) => {
        this.remoteStream?.addTrack(e.track);
        this.callbacks?.onRemoteStream?.(this.remoteStream);
        this._cancelAutoClose();
      });
    } catch (err) {
      console.error('failed prepare call:', err);
      throw err;
    }
  }

  private async _getLocalStream(): Promise<MediaStream> {
    try {
      const stream = await mediaDevices.getUserMedia(mediaConstraints);
      stream.getVideoTracks()[0].enabled = false;
      return stream;
    } catch (err) {
      console.error('failed local stream:', err);
      throw err;
    }
  }
}

export const createCallManager = (peerManager: PeerManager) => new CallManager(peerManager);
