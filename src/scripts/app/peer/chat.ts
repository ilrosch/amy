import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import PeerManager from './peer';
import { Message } from '@/src/assets/entities/message';
import { addMessages } from '../handlers/message/add';
import { getMessagesByIds } from '../../database/handlers/message/get';

type ChatCallbacks = {
  onMessage?: (peerID: string, message: Message) => void;
  onChannelOpen?: (peerID: string) => void;
  onChannelClose?: (peerID: string) => void;
};

export default class ChatManager {
  private channels = new Map<string, RTCDataChannel>();
  private queues = new Map<string, string[]>();
  private callbacks: ChatCallbacks = {};

  constructor(private peerManager: PeerManager) {
    this.peerManager.on('datachannel', ({ peerID, channel }) => {
      this._handleIncomingChannel(peerID, channel);
    });

    this.peerManager.on('close', ({ peerID }) => {
      this.channels.delete(peerID);
    });
  }

  setCallbacks(callbacks: ChatCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  async init(peerID: string): Promise<RTCDataChannel | void> {
    try {
      const exists = this.channels.get(peerID);
      if (exists?.readyState === 'open') return exists;

      const conn = await this.peerManager.createConn(peerID);

      const channel = conn.createDataChannel('chat', { ordered: true });
      this.channels.set(peerID, channel);
      this._handleChannel(peerID, channel);

      return new Promise((resolve, reject) => {
        const onOpen = () => resolve(channel);
        const onError = (e: Event) => reject(e);
        const onClose = () => reject(new Error('Channel closed before open'));

        channel.addEventListener('open', onOpen, { once: true });
        channel.addEventListener('error', onError, { once: true });
        channel.addEventListener('close', onClose, { once: true });

        this.peerManager.offer(peerID).catch(onError);
      });
    } catch (err) {
      console.error('failed to init chat:', err);
      throw err;
    }
  }

  private async _handleIncomingChannel(peerID: string, channel: RTCDataChannel): Promise<void> {
    if (channel.label !== 'chat') return;

    this.channels.set(peerID, channel);
    this._handleChannel(peerID, channel);
  }

  private _handleChannel(peerID: string, channel: RTCDataChannel): void {
    try {
      this._onOpenChannel(peerID, channel);
      this._onCloseChannel(peerID, channel);
      this._onMessageChannel(peerID, channel);
    } catch (err) {
      console.error('failed to handle channel:', err);
      throw err;
    }
  }

  private async _onOpenChannel(peerID: string, channel: RTCDataChannel) {
    channel.addEventListener('open', async () => {
      console.log('open channel with', peerID);

      const queue = this.getQueue(peerID);
      const messages = await getMessagesByIds(queue);
      messages.forEach((message) => {
        channel.send(message);
      });

      this.delQueue(peerID);
    });
  }

  private _onCloseChannel(peerID: string, channel: RTCDataChannel) {
    channel.addEventListener('close', async () => {
      console.log('close channel with', peerID);
      this.channels.delete(peerID);
    });
  }

  private _onMessageChannel(peerID: string, channel: RTCDataChannel) {
    channel.addEventListener('message', async ({ data }) => {
      await addMessages([JSON.parse(data)])
    });
  }

  private getChannel(peerID: string): RTCDataChannel {
    const channel = this.channels.get(peerID);
    if (!channel) throw new Error(`channel with ${peerID} not found`);
    return channel;
  }

  private getQueue(peerID: string) {
    const queue = this.queues.get(peerID);
    if (queue) return queue;

    const newQueue: string[] = [];
    this.queues.set(peerID, newQueue);
    return newQueue;
  }

  private delQueue(peerID: string) {
    return this.queues.delete(peerID);
  }

  private addItemQueue(peerID: string, messageID: string) {
    const queue = this.getQueue(peerID);
    queue.push(messageID);
  }

  async sendMessage(peerID: string, message: Message) {
    const channel = this.channels.get(peerID);

    if (channel?.readyState === 'open') {
      channel.send(JSON.stringify(message));
      message.status = 'sent';
      await addMessages([message]);
      return;
    }

    this.addItemQueue(peerID, message.id);

    const TIMEOUT_MS = 10_000;
    let isSentP2P = false;

    try {
      await Promise.race([
        this.init(peerID),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('P2P connection timeout')), TIMEOUT_MS),
        ),
      ]);

      const ch = this.channels.get(peerID);
      if (ch?.readyState === 'open') {
        ch.send(JSON.stringify(message));
        isSentP2P = true;
      }
    } catch (err) {
      console.log('no sent to message');
    }

    if (!isSentP2P) {
      this.peerManager.sendServer(message);
    }

    message.status = 'sent';
    await addMessages([message]);
    this.delQueue(peerID);
  }
}

export const createChatManager = (peerManager: PeerManager) => new ChatManager(peerManager);
