import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MediaStream, RTCView } from 'react-native-webrtc';

import { Colors } from '@/src/assets/tokens';
import MicrophoneMuteIcon from '@/src/assets/icons/microphone-mute-icon';

export interface CallSecondaryViewType {
  stream: MediaStream | null;
  isMicro: boolean;
  isCamera: boolean;
  setLocalFullScreen: Dispatch<SetStateAction<boolean>>;
}

export default function CallSecondaryView({
  stream,
  isMicro,
  isCamera,
  setLocalFullScreen,
}: CallSecondaryViewType) {
  const { top } = useSafeAreaInsets();

  if (!isCamera) return;

  return (
    <Pressable
      onPress={() => setLocalFullScreen((prev) => !prev)}
      style={[styles.box, { marginTop: top }]}
    >
      {!isMicro && (
        <View style={styles.micro}>
          <MicrophoneMuteIcon color={Colors.danger} size={14} />
        </View>
      )}
      <RTCView
        mirror={true}
        objectFit={'cover'}
        streamURL={stream?.toURL()}
        style={{ width: 100, aspectRatio: 3 / 4 }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    zIndex: 10,
    position: 'absolute',
    right: 12,
    width: 100,
  },
  micro: {
    position: 'absolute',
    zIndex: 3,
    bottom: 3,
    left: 3,
    padding: 6,
    borderRadius: 100,
    backgroundColor: Colors.titleDark,
  },
});
