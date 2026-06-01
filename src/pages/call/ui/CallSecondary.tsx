import { GestureResponderEvent, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { COLORS } from '@/shared/config/theme';
import MicrophoneMuteIcon from '@/assets/icons/microphone-mute';

export interface ICallSecondary {
  stream: MediaStream | null;
  isAudioEnabled: boolean;
  isCameraEnabled: boolean;
  toggleFullScreen: () => void;
}

export function CallSecondary({
  stream,
  isAudioEnabled,
  isCameraEnabled,
  toggleFullScreen,
}: ICallSecondary) {
  if (!isCameraEnabled) return;

  return (
    <TouchableWithoutFeedback
      onPress={(e: GestureResponderEvent) => {
        e.stopPropagation();
        toggleFullScreen();
      }}
    >
      <View style={styles.box}>
        {!isAudioEnabled && (
          <View style={styles.badge}>
            <MicrophoneMuteIcon color={COLORS.danger} size={14} />
          </View>
        )}
        <RTCView
          mirror
          objectFit="cover"
          streamURL={stream?.toURL()}
          style={styles.video}
          zOrder={1}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 100,
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 10,
    elevation: 5,
  },

  badge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    borderRadius: 100,
    backgroundColor: COLORS.bgDark,
    padding: 4,
    zIndex: 10,
  },

  video: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
});
