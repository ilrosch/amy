import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { MediaStream } from 'react-native-webrtc';

import { useAppSelector } from '@/src/lib/store/hooks';
import { selectContact } from '@/src/lib/store/slices/contacts';
import { Colors } from '@/src/assets/tokens';

import { CallControls } from '@/src/components/widgets/call/CallControls';
import CallPrimaryView from '@/src/components/widgets/call/CallPrimaryView';
import CallSecondaryView from '@/src/components/widgets/call/CallSecondaryView';
import CallPlaceholder from '@/src/components/widgets/call/CallPlaceholder';
import { callManager } from '@/src/scripts/app/peer/init';
import { CallStatus } from '@/src/scripts/app/peer/call';
import { useRouterBack } from '@/src/hooks/use-router-back';
import { useCall } from '@/src/hooks/call/use-call';
import inCallManager from 'react-native-incall-manager';

export default function Call() {
  const handleBack = useRouterBack();

  const { id: contactID, reply: isReply } = useLocalSearchParams<{ id: string; reply: string }>();
  const { name: contactName } = useAppSelector((s) => selectContact(s, contactID));

  const { streams, localMedia, remoteMedia, callInfo } = useCall();

  useEffect(() => {
    callManager.setCallbacks({
      onClose: () => {
        callManager.close(contactID);
        handleBack('/');
      },
      onLocalStream: streams.handleLocal,
      onRemoteStream: streams.handleRemote,
      onStatusChange: callInfo.handleStatusChange,
      onRemoteAudioStatusChange: remoteMedia.handleAudio,
      onRemoteCameraStatusChange: remoteMedia.handleCamera,
    });
  }, [
    callInfo.handleStatusChange,
    remoteMedia.handleAudio,
    remoteMedia.handleCamera,
    streams.handleLocal,
    streams.handleRemote,
  ]);

  useEffect(() => {
    if (!isReply) {
      callManager.request(contactID);
    }
  }, [contactID, isReply]);

  useEffect(() => {
    if (streams.remote) {
      callInfo.stopwatch.startTimer();
      inCallManager.stopRingtone();
    }
  }, [streams.remote]);

  // // // First enable video (primary: remote video, speaker: no phone)
  // // useEffect(() => {
  // //   (async () => {
  // //     if (firstVideoEnable && isRemoteCameraEnable) {
  // //       await setAudioModeAsync({ shouldRouteThroughEarpiece: false });
  // //       setPhoneSpeaker(false);
  // //       setLocalFullScreen(false);
  // //       setFirstVideoEnable(false);
  // //     }
  // //   })();
  // // }, [firstVideoEnable, isRemoteCameraEnable]);

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

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <CallPrimaryView stream={primary.stream} isMicro={primary.audio} />
        <CallPlaceholder
          name={contactName}
          time={callInfo.stopwatch.formattedTime}
          status={callInfo.status}
          isCamera={primary.camera}
        />
        <CallSecondaryView
          stream={secondary.stream}
          isCamera={secondary.camera}
          isMicro={secondary.audio}
          setLocalFullScreen={() => {}}
        />
      </View>
      <CallControls
        isMicro={localMedia.isAudioEnabled}
        isCamera={localMedia.isCameraEnabled}
        isPhoneSpeaker={localMedia.isSpeakerEnabled}
        localStream={streams.local}
        setMicro={localMedia.toggleAudio}
        setCamera={localMedia.toggleCamera}
        setPhoneSpeaker={localMedia.toggleSpeaker}
        peerID={contactID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.textDark,
  },
  body: {
    flexGrow: 1,
  },
});
