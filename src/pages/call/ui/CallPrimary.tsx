import { StyleSheet, View } from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';
import MicrophoneMuteIcon from '@/assets/icons/microphone-mute';
import { COLORS } from '@/shared/config/theme';

export interface ICallPrimary {
  stream: MediaStream | null;
  isAudioEnabled: boolean;
  isCameraEnabled: boolean;
}

export function CallPrimary({ stream, isAudioEnabled, isCameraEnabled }: ICallPrimary) {
  if (!isCameraEnabled) return;

  return (
    <View style={styles.box}>
      {!isAudioEnabled && (
        <View style={styles.badge}>
          <MicrophoneMuteIcon color={COLORS.danger} width={18} height={18} />
        </View>
      )}
      <RTCView
        mirror
        objectFit="cover"
        streamURL={stream?.toURL()}
        zOrder={0}
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderRadius: 100,
    backgroundColor: COLORS.bgDark,
    padding: 6,
    zIndex: 2,
  },
  box: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  video: {
    flex: 1,
    aspectRatio: 9 / 16,
  },
});
