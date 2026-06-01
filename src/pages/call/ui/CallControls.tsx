import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import { useCallManager } from '@/app-root/providers/SocketProvider/SocketProvider';
import { CallEventType } from '@/entities/call/config/event';
import { Box } from '@/shared/ui/views/Box/Box';
import { COLORS } from '@/shared/config/theme';
import { useSlide } from '@/shared/lib/hooks/useSlide';
import CameraIcon from '@/assets/icons/camera';
import CameraMuteIcon from '@/assets/icons/camera-mute';
import CloseIcon from '@/assets/icons/close';
import MicrophoneIcon from '@/assets/icons/microphone';
import MicrophoneMuteIcon from '@/assets/icons/microphone-mute';
import SpeakerIcon from '@/assets/icons/speaker';
import { ILocalMediaState } from '../model/useCall';
import CallCancelIcon from '@/assets/icons/call-cancel';

export interface CallControlsRef {
  toggleVisibility: () => void;
}

export interface ICallControls {
  media: ILocalMediaState;
  contactID: string;
}

export const CallControls = forwardRef<CallControlsRef, ICallControls>(
  ({ media, contactID }, ref) => {
    const [visible, setVisible] = useState<boolean>(true);
    const callManager = useCallManager();

    const { animSlideStyle, handleSlideIn, handleSlideOut } = useSlide();

    const {
      isAudioEnabled,
      isCameraEnabled,
      isSpeakerEnabled,
      toggleAudio,
      toggleCamera,
      toggleSpeaker,
    } = media;

    useImperativeHandle(ref, () => ({
      toggleVisibility: () => {
        if (visible) {
          handleSlideOut();
          setVisible(false);
        } else {
          setVisible(true);
          handleSlideIn();
        }
      },
    }));

    const handleEnd = () => {
      callManager.sendChangeMedia({ type: CallEventType.END_CALL });
      callManager.end(contactID);
    };

    useEffect(() => {
      return () => {
        setVisible(true);
      };
    }, []);

    return (
      <TouchableWithoutFeedback onPress={(e: GestureResponderEvent) => e.stopPropagation()}>
        <Animated.View style={[styles.wrapper, animSlideStyle]}>
          <Box style={styles.box}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={toggleCamera}
              style={[styles.btn, isCameraEnabled && styles.btnActive]}
            >
              {isCameraEnabled ? <CameraIcon /> : <CameraMuteIcon />}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={toggleAudio}
              style={[styles.btn, isAudioEnabled && styles.btnActive]}
            >
              {isAudioEnabled ? <MicrophoneIcon /> : <MicrophoneMuteIcon />}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={toggleSpeaker}
              style={[styles.btn, isSpeakerEnabled && styles.btnActive]}
            >
              <SpeakerIcon />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleEnd}
              style={[styles.btn, styles.btnDanger]}
            >
              <CallCancelIcon color={COLORS.textContrast} />
            </TouchableOpacity>
          </Box>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  },
);

CallControls.displayName = 'CallControls';

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 12,
  },
  box: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 12,
    gap: 12,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLORS.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: COLORS.textSecondary,
  },
  btnDanger: {
    backgroundColor: COLORS.danger,
  },
});
