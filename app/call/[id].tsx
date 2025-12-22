import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { MediaStream } from 'react-native-webrtc';

import { useAppSelector } from '@/lib/store/hooks';
import { selectContact } from '@/lib/store/slices/contacts';
import { CallHandlersType, CallManager } from '@/scripts/peer-to-peer/call';
import { showToast } from '@/scripts/toast';
import { Colors } from '@/assets/tokens';

import { CallControls } from '@/components/widgets/call/CallControls';
import CallPrimaryView from '@/components/widgets/call/CallPrimaryView';
import CallSecondaryView from '@/components/widgets/call/CallSecondaryView';
import CallPlaceholder from '@/components/widgets/call/CallPlaceholder';

export default function Call() {
  const router = useRouter();
  const { t } = useTranslation();
  const { id: remoteID, reply: receive } = useLocalSearchParams<{ id: string; reply: string }>();
  const { name: contactName } = useAppSelector((state) => selectContact(state, remoteID));
  const player = useAudioPlayer(require('@/assets/sounds/call.mp3'));

  const [localFullScreen, setLocalFullScreen] = useState<boolean>(true);
  const [isCameraEnable, setCameraEnable] = useState<boolean>(false);
  const [isMicroEnable, setMicroEnable] = useState<boolean>(true);
  const [isPhoneSpeaker, setPhoneSpeaker] = useState<boolean>(true);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [statusConn, setStatusConn] = useState<string>('');

  const [firstVideoEnable, setFirstVideoEnable] = useState<boolean>(true);
  const [isRemoteCameraEnable, setRemoteCamera] = useState<boolean>(false);
  const [isRemoteMicroEnable, setRemoteMicro] = useState<boolean>(true);

  // Call duration
  const [callDuration, setCallDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCallTimer = () => {
    intervalRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const minsFormatted = mins.toString().padStart(2, '0');
    const secsFormatted = secs.toString().padStart(2, '0');

    if (hrs > 0) {
      const hrsFormatted = hrs.toString().padStart(2, '0');
      return `${hrsFormatted}:${minsFormatted}:${secsFormatted}`;
    }
    return `${minsFormatted}:${secsFormatted}`;
  };

  // Handle status connection
  const handleStatus = (status: RTCPeerConnectionState) => {
    let statusMessage: string = '';
    switch (status) {
      case 'new':
        statusMessage = t('call.status-calling');
        break;
      case 'connecting':
        statusMessage = t('call.status-connecting');
        break;
      case 'connected':
        statusMessage = t('call.status-connected');
        break;
      case 'disconnected':
        statusMessage = t('call.status-disconnected');
        break;
    }
    setStatusConn(statusMessage);
  };

  // Init call
  useEffect(() => {
    (async () => {
      const handlers: CallHandlersType = {
        onStatus: handleStatus,
        onRemoteStream: setRemoteStream,
        onRemoteCameraMute: setRemoteCamera,
        onRemoteMicroMute: setRemoteMicro,
      };

      try {
        if (!remoteID) throw new Error('remoteID no exists');

        if (receive) {
          await CallManager.initIncomingCall(remoteID, handlers);
        } else {
          await CallManager.initCall(remoteID, handlers);
          await setAudioModeAsync({ shouldRouteThroughEarpiece: true });
          player.loop = true;
          player.play();
        }

        setLocalStream(CallManager.getCurrentLocalStream());
      } catch (err) {
        router.back();
        showToast({ type: 'error', text1: t('errors.error') });
        console.log('Failed call:', err);
      }
    })();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      CallManager.clearCall();
    };
  }, []);

  // First enable video (primary: remote video, speaker: no phone)
  useEffect(() => {
    (async () => {
      if (firstVideoEnable && isRemoteCameraEnable) {
        await setAudioModeAsync({ shouldRouteThroughEarpiece: false });
        setPhoneSpeaker(false);
        setLocalFullScreen(false);
        setFirstVideoEnable(false);
      }
    })();
  }, [firstVideoEnable, isRemoteCameraEnable]);

  // Stop ringtone + start timing
  useEffect(() => {
    if (remoteStream) {
      player.pause();
      startCallTimer();
    }
  }, [player, remoteStream]);

  const { primary, secondary } = localFullScreen
    ? {
        primary: { stream: localStream, micro: isMicroEnable, camera: isCameraEnable },
        secondary: { stream: remoteStream, micro: isRemoteMicroEnable, camera: isRemoteCameraEnable },
      }
    : {
        primary: { stream: remoteStream, micro: isRemoteMicroEnable, camera: isRemoteCameraEnable },
        secondary: { stream: localStream, micro: isMicroEnable, camera: isCameraEnable },
      };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <CallPrimaryView stream={primary.stream} isMicro={primary.micro} />
        <CallPlaceholder
          name={contactName}
          time={formatTime(callDuration)}
          status={statusConn}
          isCamera={primary.camera}
        />
        <CallSecondaryView
          stream={secondary.stream}
          isCamera={secondary.camera}
          isMicro={secondary.micro}
          setLocalFullScreen={setLocalFullScreen}
        />
      </View>
      <CallControls
        isMicro={isMicroEnable}
        isCamera={isCameraEnable}
        isPhoneSpeaker={isPhoneSpeaker}
        localStream={localStream}
        setMicro={setMicroEnable}
        setCamera={setCameraEnable}
        setPhoneSpeaker={setPhoneSpeaker}
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
