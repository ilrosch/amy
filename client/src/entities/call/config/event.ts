export enum CallEventType {
  CAMERA_CHANGED = 'camera_changed_event',
  AUDIO_CHANGED = 'audio_changed_event',
  END_CALL = 'end_call_event',
}

export type CallEvent = {
  type: CallEventType;
  enabled?: boolean;
};

export enum CallStatus {
  PENDING = 'status.pending',
  CONNECTING = 'status.connecting',
  RECONNECTING = 'status.reconnecting',
  CONNECTED = 'status.connected',
}
