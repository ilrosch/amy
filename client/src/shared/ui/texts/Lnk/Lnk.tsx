import { Animated, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Txt, TxtType } from '../Txt';
import { usePressAnimScale } from '@/shared/lib/hooks/usePressAnimScale';

export type LnkType = {
  text: string;
  onPress?: () => void;
  opacity?: number;
  textProps?: TxtType;
} & TouchableOpacityProps;

export function Lnk({ text, onPress, opacity = 0.7, textProps = {}, ...props }: LnkType) {
  const { animScaleStyle, pressHandlers } = usePressAnimScale();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={opacity}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...pressHandlers}
      {...props}
    >
      <Animated.View style={animScaleStyle}>
        <Txt style={{ textDecorationLine: 'underline' }} isBold {...textProps}>
          {text}
        </Txt>
      </Animated.View>
    </TouchableOpacity>
  );
}
