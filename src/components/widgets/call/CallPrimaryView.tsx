import MicrophoneMuteIcon from '@/src/assets/icons/microphone-mute-icon';
import { Colors } from '@/src/assets/tokens';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MediaStream, RTCView } from 'react-native-webrtc';

export interface CallPrimaryViewType {
  stream: MediaStream | null;
  isMicro: boolean;
}

export default function CallPrimaryView({ stream, isMicro }: CallPrimaryViewType) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[{ flex: 1, alignItems: 'center', marginBottom: -30 }]}>
      {!isMicro && (
        <View
          style={{
            position: 'absolute',
            top: top + 6,
            left: 12,
            zIndex: 2,
            borderRadius: 100,
            backgroundColor: Colors.titleDark,
            padding: 8,
          }}
        >
          <MicrophoneMuteIcon color={Colors.danger} size={16} />
        </View>
      )}
      <RTCView
        mirror={true}
        objectFit={'cover'}
        streamURL={stream?.toURL()}
        style={{ flex: 1, aspectRatio: 9 / 16 }}
        zOrder={1}
      />
    </View>
  );
}
