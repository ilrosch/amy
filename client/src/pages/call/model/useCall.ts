import { useCallback, useEffect, useState } from 'react';
import { useCallDuration } from './useCallDuration';
import { useTranslation } from 'react-i18next';
import { useCallManager } from '@/app-root/providers/SocketProvider/SocketProvider';
import inCallManager from 'react-native-incall-manager';
import { MediaStream } from 'react-native-webrtc';
import { CallEventType, CallStatus } from '@/entities/call/config/event';
import { useCallEffect } from './useCallEffect';
import { useAudioPlayer } from 'expo-audio';

// 1. Интерфейс для группы localMedia
export interface ILocalMediaState {
  isAudioEnabled: boolean;
  isCameraEnabled: boolean;
  isSpeakerEnabled: boolean;
  toggleAudio: () => void;
  toggleCamera: () => void;
  toggleSpeaker: () => void;
  setAudio: (enabled: boolean) => void;
  setCamera: (enabled: boolean) => void;
  setSpeaker: (enabled: boolean) => void;
}

// 2. Интерфейсы для остальных блоков (пригодятся для полной типизации хука)
export interface IRemoteMediaState {
  isAudioEnabled: boolean;
  isCameraEnabled: boolean;
  handleAudio: (enabled: boolean) => void;
  handleCamera: (enabled: boolean) => void;
}

export interface ICallStreams {
  local: MediaStream | null;
  remote: MediaStream | null;
  handleLocal: (stream: MediaStream | null) => void;
  handleRemote: (stream: MediaStream | null) => void;
}

export interface ICallInfo {
  stopwatch: number;
  status: 'incoming' | 'dialing' | 'connected' | 'disconnected';
  handleStatusChange: (status: any) => void;
  isLocalFullScreen: boolean;
}

// 3. Общий интерфейс возвращаемого значения хука
export interface UseCallReturn {
  streams: ICallStreams;
  localMedia: ILocalMediaState;
  remoteMedia: IRemoteMediaState;
  callInfo: ICallInfo;
}

export interface IUseCall {
  isOutgoing: boolean;
}

export const useCall = ({ isOutgoing }: IUseCall) => {
  const { t } = useTranslation('call');
  const callManager = useCallManager();

  // call state
  const stopwatch = useCallDuration();
  const [status, setStatus] = useState<string>(CallStatus.PENDING);
  const [isLocalFullScreen, setIsLocalFullScreen] = useState<boolean>(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // local media
  const [isLocalAudioEnabled, setIsLocalAudioEnabled] = useState(true);
  const [isLocalCameraEnabled, setIsLocalCameraEnabled] = useState(false);
  const [isLocalSpeakerEnabled, setIsLocalSpeakerEnabled] = useState(false);

  // remote media
  const [isRemoteAudioEnabled, setIsRemoteAudioEnabled] = useState(false);
  const [isRemoteCameraEnabled, setIsRemoteCameraEnabled] = useState(false);

  useEffect(() => {
    return () => {
      setStatus(CallStatus.PENDING);
      setIsLocalFullScreen(true);
      setLocalStream(null);
      setRemoteStream(null);
      setIsLocalAudioEnabled(true);
      setIsLocalCameraEnabled(false);
      setIsLocalSpeakerEnabled(false);
      setIsRemoteAudioEnabled(false);
      setIsRemoteCameraEnabled(false);
    };
  }, []);

  const pendingPlayer = useAudioPlayer('ringtone_outgoing_call', { downloadFirst: true });
  const connectingPlayer = useAudioPlayer('ringtone_connecting_call');

  useEffect(() => {
    pendingPlayer.loop = true;
    connectingPlayer.loop = true;

    switch (status) {
      case t(CallStatus.PENDING):
        pendingPlayer.play();
        break;
      case t(CallStatus.CONNECTING):
      case t(CallStatus.RECONNECTING):
        connectingPlayer.pause();
        connectingPlayer.play();
        break;
      case t(CallStatus.CONNECTED):
        pendingPlayer.pause();
        connectingPlayer.pause();
        break;
    }
  }, [status]);

  useEffect(() => {
    inCallManager.start({ media: 'audio' });

    return () => {
      inCallManager.stop();
    };
  }, []);

  const handleStatusChange = useCallback(
    (s: string) => {
      setStatus(t(s));
    },
    [t],
  );

  const handleLocalStream = useCallback((stream: MediaStream) => {
    setLocalStream(stream);
  }, []);

  const handleRemoteStream = useCallback((stream: MediaStream) => {
    setRemoteStream(stream);
  }, []);

  const handleRemoteAudioEnabled = useCallback((enabled: boolean) => {
    setIsRemoteAudioEnabled(enabled);
  }, []);

  const handleRemoteCameraEnabled = useCallback((enabled: boolean) => {
    setIsRemoteCameraEnabled(enabled);
  }, []);

  const handleLocalSpeaker = useCallback((enabled: boolean) => {
    inCallManager.setSpeakerphoneOn(enabled);
    setIsLocalSpeakerEnabled(enabled);
  }, []);

  const toggleFullScreen = useCallback(() => {
    setIsLocalFullScreen((p) => !p);
  }, []);

  const toggleLocalAudio = useCallback(() => {
    const audioTracks = localStream?.getAudioTracks();
    if (audioTracks) {
      const newState = !isLocalAudioEnabled;
      callManager.sendChangeMedia({ type: CallEventType.AUDIO_CHANGED, enabled: newState });
      audioTracks.forEach((t) => {
        t.enabled = newState;
      });
      setIsLocalAudioEnabled(newState);
    }
  }, [isLocalAudioEnabled, localStream]);

  const toggleLocalCamera = useCallback(() => {
    const videoTracks = localStream?.getVideoTracks();
    if (videoTracks) {
      const newState = !isLocalCameraEnabled;
      callManager.sendChangeMedia({ type: CallEventType.CAMERA_CHANGED, enabled: newState });
      videoTracks.forEach((t) => {
        t.enabled = newState;
      });
      setIsLocalCameraEnabled(newState);
    }
  }, [isLocalCameraEnabled, localStream]);

  const toggleLocalSpeaker = useCallback(async () => {
    const newState = !isLocalSpeakerEnabled;
    inCallManager.setSpeakerphoneOn(newState);
    setIsLocalSpeakerEnabled(newState);
  }, [isLocalSpeakerEnabled]);

  useEffect(() => {
    if (remoteStream) {
      stopwatch.startTimer();
    }
  }, [remoteStream, stopwatch]);

  useCallEffect({
    isLocalCameraEnabled,
    isRemoteCameraEnabled,
    handleLocalSpeaker,
    setIsLocalFullScreen,
  });

  return {
    streams: {
      local: localStream,
      remote: remoteStream,
      handleLocal: handleLocalStream,
      handleRemote: handleRemoteStream,
    },
    localMedia: {
      isAudioEnabled: isLocalAudioEnabled,
      isCameraEnabled: isLocalCameraEnabled,
      isSpeakerEnabled: isLocalSpeakerEnabled,
      toggleAudio: toggleLocalAudio,
      toggleCamera: toggleLocalCamera,
      toggleSpeaker: toggleLocalSpeaker,
      setAudio: setIsLocalAudioEnabled,
      setCamera: setIsLocalCameraEnabled,
      setSpeaker: setIsLocalSpeakerEnabled,
    },
    remoteMedia: {
      isAudioEnabled: isRemoteAudioEnabled,
      isCameraEnabled: isRemoteCameraEnabled,
      handleAudio: handleRemoteAudioEnabled,
      handleCamera: handleRemoteCameraEnabled,
    },
    callInfo: {
      stopwatch,
      status,
      handleStatusChange,
      isLocalFullScreen,
      toggleFullScreen,
    },
  };
};
