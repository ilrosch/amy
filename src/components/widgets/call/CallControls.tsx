import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MediaStream } from 'react-native-webrtc';
import { setAudioModeAsync } from 'expo-audio';

import { appStyles, Colors } from '@/src/assets/tokens';
import { CallManager } from '@/src/scripts/peer-to-peer/call';

import CameraIcon from '@/src/assets/icons/camera-icon';
import CameraMuteIcon from '@/src/assets/icons/camera-mute-icon';
import CloseIcon from '@/src/assets/icons/close-icon';
import MicrophoneIcon from '@/src/assets/icons/microphone-icon';
import MicrophoneMuteIcon from '@/src/assets/icons/microphone-mute-icon';
import SpeakerIcon from '@/src/assets/icons/speaker-icon';
import SpeakerPhoneIcon from '@/src/assets/icons/speaker-phone-icon';
import { callManager } from '@/src/scripts/app/peer/init';
import { MediaEventType } from '@/src/scripts/app/peer/call';

export interface CallControlsType {
  isMicro: boolean;
  isCamera: boolean;
  isPhoneSpeaker: boolean;
  localStream: MediaStream | null;
  setMicro: Dispatch<SetStateAction<boolean>>;
  setCamera: Dispatch<SetStateAction<boolean>>;
  setPhoneSpeaker: Dispatch<SetStateAction<boolean>>;
  status?: boolean;
  peerID: string;
}

export function CallControls({
  isMicro,
  isCamera,
  isPhoneSpeaker,
  localStream,
  setMicro,
  setCamera,
  setPhoneSpeaker,
  status = true,
  peerID,
}: CallControlsType) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  // Handlers local media

  const handleExit = () => {
    callManager.send(MediaEventType.END_CALL).then(() => {
      callManager.close(peerID);
      router.replace('/');
    });
  };

  return (
    <View style={[appStyles.box, styles.box, { paddingBottom: bottom + 16 }]}>
      {status && (
        <>
          <Pressable onPress={setCamera} style={[styles.btn, !isCamera && styles.btnBG]}>
            {isCamera ? (
              <CameraIcon color={Colors.textDark} />
            ) : (
              <CameraMuteIcon color={Colors.textDark} />
            )}
          </Pressable>
          <Pressable onPress={setMicro} style={[styles.btn, !isMicro && styles.btnBG]}>
            {isMicro ? (
              <MicrophoneIcon color={Colors.textDark} />
            ) : (
              <MicrophoneMuteIcon color={Colors.textDark} />
            )}
          </Pressable>
          <Pressable
            onPress={setPhoneSpeaker}
            style={[styles.btn, !isPhoneSpeaker && styles.btnBG]}
          >
            {isPhoneSpeaker ? (
              <SpeakerPhoneIcon color={Colors.textDark} />
            ) : (
              <SpeakerIcon color={Colors.textDark} />
            )}
          </Pressable>
        </>
      )}

      <Pressable onPress={handleExit} style={[styles.btn, { backgroundColor: Colors.danger }]}>
        <CloseIcon color={Colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 12,
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
