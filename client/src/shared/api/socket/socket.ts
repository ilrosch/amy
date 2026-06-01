export type SocketHandleMessageCallback = (data: any) => void;
export type SocketHandleCloseCallback = () => void;
export type SocketHandleOpenCallback = () => void;

export type SocketConfig = {
  token: string;
  onMessage: SocketHandleMessageCallback;
  onClose: SocketHandleCloseCallback;
  onOpen: SocketHandleOpenCallback;
};

const RETRY_DELAY = 1000;
const MAX_RETRIES = 30;

export class SocketManager {
  private countRetries = MAX_RETRIES;

  private socket: WebSocket | null = null;
  private config: SocketConfig | null = null;
  private reconnectTimer: number | null = null;

  constructor(private buildURL: (token: string) => string) {}

  connect(config: SocketConfig) {
    this.config = config;
    this.socket = new WebSocket(this.buildURL(config.token));
    this.socket.onmessage = (e) => this._onMessage(e);
    this.socket.onclose = (e) => this._onClose(e);
    this.socket.onopen = () => this._onOpen();
  }

  send(type: string, payload: any): boolean {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      console.warn(`socket not ready. state: ${this.socket?.readyState}`);
      return false;
    }
    this.socket.send(JSON.stringify({ type, payload }));
    return true;
  }

  disconnect() {
    this.config = null;
    this._clearTimer();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  private _onMessage(e: MessageEvent) {
    try {
      const data = JSON.parse(e.data);
      if (!this.config?.onMessage) {
        console.warn('socket message received but no handler is set');
        return;
      }
      this.config.onMessage(data);
    } catch (err) {
      console.error('failed to parse socket message:', err);
    }
  }

  private _onOpen() {
    this.countRetries = MAX_RETRIES;
    this.config?.onOpen();
  }

  private _onClose(e: CloseEvent) {
    this.config?.onClose();
    if (!e.wasClean && this.config) {
      this._reconnect();
    }
  }

  private _reconnect(): void {
    this._clearTimer();
    if (this.countRetries > 0 && this.config) {
      this.reconnectTimer = setTimeout(() => {
        if (this.config) {
          this.connect(this.config);
        }
      }, RETRY_DELAY);
      this.countRetries -= 1;
    }
  }

  private _clearTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}
