import { useCallback, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCallManager } from '@/app-root/providers/SocketProvider/SocketProvider';
import { useAppSelector } from '@/app-root/store';
import { selectContactByID } from '@/entities/contact';
import { useBack } from '@/shared/lib/hooks/useBack';
import { SafeView } from '@/shared/ui/views/SafeView';
import { useCall } from '../model/useCall';
import { CallControls, CallControlsRef } from './CallControls';
import { CallPrimary } from './CallPrimary';
import { CallSecondary } from './CallSecondary';
import { CallPlaceholder } from './CallPlaceholder';

export default function Call() {
  const { id: contactID, reply } = useLocalSearchParams<{ id: string; reply: string }>();
  const contact = useAppSelector((s) => selectContactByID(s, contactID));
  const callManager = useCallManager();
  const handleBack = useBack();

  const { streams, localMedia, remoteMedia, callInfo } = useCall({ isOutgoing: !reply });

  useEffect(() => {
    callManager.setCallback({
      onClose: handleBack,
      onLocalStream: streams.handleLocal,
      onRemoteStream: streams.handleRemote,
      onStatusChange: callInfo.handleStatusChange,
      onRemoteAudioStatusChange: remoteMedia.handleAudio,
      onRemoteCameraStatusChange: remoteMedia.handleCamera,
    });
  }, [
    callInfo.handleStatusChange,
    callManager,
    handleBack,
    remoteMedia.handleAudio,
    remoteMedia.handleCamera,
    streams.handleLocal,
    streams.handleRemote,
  ]);

  useEffect(() => {
    if (!reply) {
      callManager.request(contactID);
    } else {
      callManager.initStream();
    }
  }, [callManager, contactID, reply]);

  const local = {
    stream: streams.local,
    audio: localMedia.isAudioEnabled,
    camera: localMedia.isCameraEnabled,
  };

  const remote = {
    stream: streams.remote,
    audio: remoteMedia.isAudioEnabled,
    camera: remoteMedia.isCameraEnabled,
  };

  const [primary, secondary] = callInfo.isLocalFullScreen ? [local, remote] : [remote, local];

  const controlsRef = useRef<CallControlsRef>(null);

  const handleScreenTap = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.toggleVisibility();
    }
  }, []);

  return (
    <SafeView>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={{ flex: 1 }}>
          <CallPlaceholder
            contactName={contact.name}
            status={callInfo.status}
            duration={callInfo.stopwatch.formattedTime}
            isCameraEnabled={primary.camera}
            isOutgoing={!reply}
          />
          <CallPrimary
            stream={primary.stream}
            isAudioEnabled={primary.audio}
            isCameraEnabled={primary.camera}
          />
          <CallSecondary
            stream={secondary.stream}
            isAudioEnabled={secondary.audio}
            isCameraEnabled={secondary.camera}
            toggleFullScreen={callInfo.toggleFullScreen}
          />
          <CallControls ref={controlsRef} media={localMedia} contactID={contactID} />
        </View>
      </TouchableWithoutFeedback>
    </SafeView>
  );
}
