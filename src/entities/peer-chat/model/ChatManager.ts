import { PeerManager } from '@/entities/peer-session';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import { Message, MessageDTO, MessageStatusChange, MessageStatusChangeDTO } from '../config/types';
import { IChatSignaling } from '../config/signaling';
import {
  mapMessageDtoToEntity,
  mapMessageEntityToDto,
  mapStatusChangeDtoToEntity,
  mapStatusChangeEntityToDto,
} from './mapper';
import { saveMessage } from '../api/saveMessage';
import { updateMessageStatus } from '../api/updateMesaageStatus';

export enum PeerMessageType {
  MESSAGE = 'message',
  STATUS = 'status',
}

export type PeerChatSession = {
  channel: RTCDataChannel;
  messageQueue: MessageDTO[];
  statusQueue: Map<string, MessageStatusChangeDTO>;
  timeoutID?: number | null;
};

export interface IChatCallbacks {
  onMessage?: (message: Message) => void;
  onStatusChange?: (status: MessageStatusChange) => void;
}

export class ChatManager {
  private sessions = new Map<string, PeerChatSession>();
  private readonly TIMEOUT = 60_000;
  private callbacks: IChatCallbacks = {};

  constructor(
    private peerManager: PeerManager,
    private signaling: IChatSignaling,
  ) {
    this.peerManager.on('datachannel', ({ peerID, channel }) => {
      if (channel.label !== 'chat') return;

      this._buildSession(peerID, channel);
      this._resetTimer(peerID);
    });

    this.peerManager.on('close', ({ peerID }) => {
      this.end(peerID);
    });
  }

  setCallback(callbacks: IChatCallbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  private _getSession(peerID: string): PeerChatSession | undefined {
    return this.sessions.get(peerID);
  }

  private _buildSession(peerID: string, channel: RTCDataChannel): PeerChatSession {
    const existSession = this._getSession(peerID);
    if (existSession?.timeoutID) {
      clearTimeout(existSession.timeoutID);
    }

    const session: PeerChatSession = {
      channel,
      messageQueue: existSession?.messageQueue ?? [],
      statusQueue: existSession?.statusQueue ?? new Map(),
      timeoutID: null,
    };

    this.sessions.set(peerID, session);
    this._handleChannel(peerID, channel);

    return session;
  }

  private _isDeadChannel(channel: RTCDataChannel): boolean {
    return ['closing', 'closed'].includes(channel.readyState);
  }

  private _resetTimer(peerID: string) {
    const session = this._getSession(peerID);
    if (!session) return;

    if (session.timeoutID) {
      clearTimeout(session.timeoutID);
    }

    session.timeoutID = setTimeout(() => {
      console.log(`closing idle connection for: ${peerID}`);
      this.end(peerID);
    }, this.TIMEOUT);
  }

  getChannel(peerID: string): RTCDataChannel | null {
    const session = this._getSession(peerID);
    if (!session) return null;

    const channel = session.channel;
    if (!channel) return null;

    return this._isDeadChannel(channel) ? null : channel;
  }

  getMessageQueue(peerID: string): MessageDTO[] | null {
    const session = this._getSession(peerID);
    if (!session) return null;

    const queue = session.messageQueue;
    if (!queue) return null;

    return queue;
  }

  getStatusQueue(peerID: string): Map<string, MessageStatusChangeDTO> | null {
    const session = this._getSession(peerID);
    if (!session) return null;

    const queue = session.statusQueue;
    if (!queue) return null;

    return queue;
  }

  async init(peerID: string): Promise<RTCDataChannel | null> {
    try {
      const existChannel = this.getChannel(peerID);
      if (existChannel) return existChannel;

      const conn = await this.peerManager.createSession(peerID);
      if (!conn) return null;

      const channel = conn.createDataChannel('chat', { ordered: true });
      this._buildSession(peerID, channel);

      this.peerManager.offer(peerID);
      return channel;
    } catch (err) {
      console.error('failed to init chat:', err);
      throw err;
    }
  }

  async end(peerID: string) {
    const session = this._getSession(peerID);
    if (!session) return;
    if (session.timeoutID) {
      clearTimeout(session.timeoutID);
    }

    this.sessions.delete(peerID);
    this.peerManager.closeSession(peerID);
  }

  private _handleChannel(peerID: string, channel: RTCDataChannel) {
    channel.addEventListener('open', () => {
      this._resetTimer(peerID);

      const session = this._getSession(peerID);
      if (!session) return;

      session.statusQueue.forEach((statusDTO) => {
        channel.send(
          JSON.stringify({
            type: PeerMessageType.STATUS,
            payload: statusDTO,
          }),
        );
      });
      session.statusQueue.clear();

      while (session.messageQueue.length > 0) {
        const msg = session.messageQueue.shift();
        channel.send(JSON.stringify({ type: PeerMessageType.MESSAGE, payload: msg }));
      }
    });

    channel.addEventListener('close', () => this.end(peerID));

    channel.addEventListener('message', async (e) => {
      this._resetTimer(peerID);

      try {
        const { type, payload } = JSON.parse(e.data);

        switch (type as PeerMessageType) {
          case PeerMessageType.MESSAGE:
            const messageDTO = payload as MessageDTO;
            messageDTO.status = 'new';

            await saveMessage(messageDTO);
            const message = mapMessageDtoToEntity(messageDTO);

            this.onChangeStatus(peerID, {
              id: message.id,
              userFrom: message.userTo,
              userTo: message.userFrom,
              chatID: message.chatID,
              status: 'delivered',
            }).catch(console.error);

            this.callbacks?.onMessage?.(message);
            break;
          case PeerMessageType.STATUS:
            const status = mapStatusChangeDtoToEntity(payload);
            await updateMessageStatus(status.id, status.status);
            this.callbacks?.onStatusChange?.(status);
            break;
          default:
            console.warn('unknown message type:', type);
        }
      } catch (err) {
        console.error('failed to perse message:', err);
      }
    });
  }

  async sendMessage(peerID: string, message: Message) {
    const messageDTO = mapMessageEntityToDto(message);

    try {
      await saveMessage(messageDTO);
    } catch (err) {
      console.error('failed to save message:', err);
      throw new Error('ERR_SAVE_DB');
    }

    try {
      const channel = await this.init(peerID);
      this._resetTimer(peerID);

      if (channel) {
        if (channel.readyState === 'open') {
          channel.send(
            JSON.stringify({
              type: PeerMessageType.MESSAGE,
              payload: messageDTO,
            }),
          );
        } else {
          const session = this._getSession(peerID);
          session?.messageQueue.push(messageDTO);
        }
      } else {
        const isSuccess = this.signaling.sendMessage(peerID, messageDTO);
        if (!isSuccess) throw new Error('ERR_SEND_SERVER');
      }
    } catch (err) {
      console.error('failed to send message:', err);
      throw err;
    }

    this.callbacks?.onStatusChange?.({
      id: message.id,
      userFrom: message.userFrom,
      userTo: message.userTo,
      chatID: message.chatID,
      status: 'sent',
    });
  }

  async onChangeStatus(peerID: string, status: MessageStatusChange) {
    const statusDTO = mapStatusChangeEntityToDto(status);
    await updateMessageStatus(status.id, status.status);
    try {
      const channel = await this.init(peerID);
      this._resetTimer(peerID);

      if (channel) {
        if (channel.readyState === 'open') {
          channel.send(
            JSON.stringify({
              type: PeerMessageType.STATUS,
              payload: statusDTO,
            }),
          );
        } else {
          const session = this._getSession(peerID);
          session?.statusQueue.set(status.id, statusDTO);
        }
      } else {
        const isSuccess = this.signaling.sendStatus(peerID, statusDTO);
        if (!isSuccess) throw new Error('ERR_SEND_SERVER');
      }
    } catch (err) {
      console.error('failed to send status message:', err);
      throw err;
    }
  }
}
