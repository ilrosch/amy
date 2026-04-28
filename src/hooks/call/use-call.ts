import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MediaStream } from 'react-native-webrtc';
import { useCallDuration } from './use-сall-duration';
import { useCallEffects } from './use-effects';
import { callManager } from '@/src/scripts/app/peer/init';
import { MediaEventType } from '@/src/scripts/app/peer/call';
import inCallManager from 'react-native-incall-manager';

export const useCall = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // inCallManager.start({ media: 'video' });
    // inCallManager.startRingtone('_DEFAULT_', 10, 'playback', Infinity);
    // return () => {
    //   inCallManager.stopRingtone();
    //   inCallManager.stop();
    // };
  }, []);

  // call state
  const stopwatch = useCallDuration();
  const [status, setStatus] = useState<string>('');
  const [isLocalFullScreen, setIsLocalFullScreen] = useState<boolean>(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // local media
  const [isLocalAudioEnabled, setIsLocalAudioEnabled] = useState(true);
  const [isLocalCameraEnabled, setIsLocalCameraEnabled] = useState(false);
  const [isLocalSpeakerEnabled, setIsLocalSpeakerEnabled] = useState(true);

  // remote media
  const [isRemoteAudioEnabled, setIsRemoteAudioEnabled] = useState(false);
  const [isRemoteCameraEnabled, setIsRemoteCameraEnabled] = useState(false);

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

  const toggleLocalAudio = useCallback(() => {
    const audioTrack = localStream?.getAudioTracks();
    if (audioTrack) {
      const newState = !isLocalAudioEnabled;
      callManager.send(MediaEventType.AUDIO_CHANGED, newState);
      audioTrack[0].enabled = newState;
      setIsLocalAudioEnabled(newState);
    }
  }, [isLocalAudioEnabled, localStream]);

  const toggleLocalCamera = useCallback(() => {
    const videoTrack = localStream?.getVideoTracks();
    if (videoTrack) {
      const newState = !isLocalCameraEnabled;
      callManager.send(MediaEventType.CAMERA_CHANGED, newState);
      videoTrack[0].enabled = newState;
      setIsLocalCameraEnabled(newState);
    }
  }, [isLocalCameraEnabled, localStream]);

  const toggleLocalSpeaker = useCallback(async () => {
    const newState = !isLocalSpeakerEnabled;
    inCallManager.setSpeakerphoneOn(newState);
    setIsLocalSpeakerEnabled(newState);
  }, [isLocalSpeakerEnabled]);

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
    },
  };
};
