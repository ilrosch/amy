import { Animated, Dimensions, TouchableOpacity, View, ViewProps } from 'react-native';
import { SafeView } from '../SafeView';
import { styles } from './ModalViewstyle';
import { Txt } from '../../texts/Txt';
import CloseIcon from '@/assets/icons/close';
import { COLORS } from '@/shared/config/theme';
import { AnimView } from '../AnimView';
import { useBack } from '@/shared/lib/hooks/useBack';
import { useCallback } from 'react';
import { useSlideOut } from '@/shared/lib/hooks/useSlideOut';

import { ContainerScroll } from '../ContainerScroll';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type ModalViewType = {
  title: string;
  text?: string;
} & ViewProps;

export function ModalView({ title, text = '', children }: ModalViewType) {
  const handleBack = useBack();
  const { animSlideOutStyle, handleSlideOut } = useSlideOut({ value: SCREEN_HEIGHT + 100 });

  const handleClose = useCallback(() => {
    handleSlideOut();
    setTimeout(() => {
      handleBack();
    }, 300);
  }, [handleBack, handleSlideOut]);

  return (
    <SafeView style={styles.overlay}>
      <View style={styles.container}>
        <Animated.View style={animSlideOutStyle}>
          <AnimView
            variant="slideUp"
            conf={{ value: SCREEN_HEIGHT, duration: 700, delay: 0 }}
            style={[styles.modal]}
          >
            <TouchableOpacity onPress={handleClose} activeOpacity={0.9} style={styles.close}>
              <CloseIcon color={COLORS.danger} />
            </TouchableOpacity>
            <ContainerScroll contentContainerStyle={styles.modalBody} style={{ borderRadius: 30 }}>
              <View style={{ gap: 4 }}>
                <Txt color="textHeader" size="l" isBold>
                  {title}
                </Txt>
                {text && <Txt>{text}</Txt>}
              </View>
              {children}
            </ContainerScroll>
          </AnimView>
        </Animated.View>
      </View>
    </SafeView>
  );
}
