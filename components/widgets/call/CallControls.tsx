import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MediaStream } from 'react-native-webrtc';
import { setAudioModeAsync } from 'expo-audio';

import { Colors } from '@/assets/tokens';
import { CallManager } from '@/scripts/peer-to-peer/call';

import CameraIcon from '@/assets/icons/camera-icon';
import CameraMuteIcon from '@/assets/icons/camera-mute-icon';
import CloseIcon from '@/assets/icons/close-icon';
import MicrophoneIcon from '@/assets/icons/microphone-icon';
import MicrophoneMuteIcon from '@/assets/icons/microphone-mute-icon';
import SpeakerIcon from '@/assets/icons/speaker-icon';
import SpeakerPhoneIcon from '@/assets/icons/speaker-phone-icon';

export interface CallControlsType {
  isMicro: boolean;
  isCamera: boolean;
  isPhoneSpeaker: boolean;
  localStream: MediaStream | null;
  setMicro: Dispatch<SetStateAction<boolean>>;
  setCamera: Dispatch<SetStateAction<boolean>>;
  setPhoneSpeaker: Dispatch<SetStateAction<boolean>>;
}

export function CallControls({
  isMicro,
  isCamera,
  isPhoneSpeaker,
  localStream,
  setMicro,
  setCamera,
  setPhoneSpeaker,
}: CallControlsType) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  // Handlers local media
  const handleCamera = () => {
    if (!localStream) return;
    const videoTrack = localStream?.getVideoTracks()[0];
    if (videoTrack) {
      CallManager.sendData({ type: isCamera ? 'camera-enable' : 'camera-mute' });
      videoTrack.enabled = !isCamera;
      setCamera((prev) => !prev);
    }
  };

  const handleMicrophone = () => {
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      CallManager.sendData({ type: isMicro ? 'micro-enable' : 'micro-mute' });
      audioTrack.enabled = !isMicro;
      setMicro((prev) => !prev);
    }
  };

  const handleSpeaker = async () => {
    await setAudioModeAsync({ shouldRouteThroughEarpiece: !isPhoneSpeaker });
    setPhoneSpeaker(!isPhoneSpeaker);
  };

  const handleExit = () => {
    CallManager.sendEndCall();
    router.back();
  };

  return (
    <View style={[styles.box, { paddingBottom: bottom + 12 }]}>
      <Pressable onPress={handleCamera} style={[styles.btn, !isCamera && styles.btnBG]}>
        {isCamera ? <CameraIcon color={Colors.textDark} /> : <CameraMuteIcon color={Colors.textDark} />}
      </Pressable>
      <Pressable onPress={handleMicrophone} style={[styles.btn, !isMicro && styles.btnBG]}>
        {isMicro ? <MicrophoneIcon color={Colors.textDark} /> : <MicrophoneMuteIcon color={Colors.textDark} />}
      </Pressable>
      <Pressable onPress={handleSpeaker} style={[styles.btn, !isPhoneSpeaker && styles.btnBG]}>
        {isPhoneSpeaker ? <SpeakerPhoneIcon color={Colors.textDark} /> : <SpeakerIcon color={Colors.textDark} />}
      </Pressable>
      <Pressable onPress={handleExit} style={[styles.btn, { backgroundColor: Colors.danger }]}>
        <CloseIcon color={Colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 6,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBG: {
    backgroundColor: Colors.label,
  },
});
