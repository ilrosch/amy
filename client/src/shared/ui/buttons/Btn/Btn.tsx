import { ActivityIndicator, Animated, Pressable, StyleProp, ViewStyle } from 'react-native';
import { usePressAnimScale } from '@/shared/lib/hooks/usePressAnimScale';
import { ColorName, COLORS } from '@/shared/config/theme';
import { Txt, type TxtType } from '../../texts/Txt';
import { styles } from './Btn.style';

export type BtnVariant = 'primary' | 'secondary' | 'danger' | 'custom';

export type BtnType = {
  text: string;
  onPress: () => void;
  variant?: BtnVariant;
  useAnimPress?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  textProps?: TxtType;
  style?: StyleProp<ViewStyle>;
};

const BtnVariantStyle: Record<BtnVariant, { btn: any; text: ColorName }> = {
  primary: { btn: styles.primary, text: 'textContrast' },
  secondary: { btn: styles.secondary, text: 'textMain' },
  danger: { btn: styles.danger, text: 'textContrast' },
  custom: { btn: {}, text: 'textMain' },
};

export function Btn({
  text,
  onPress,
  variant = 'primary',
  useAnimPress = true,
  isLoading = false,
  isDisabled = false,
  textProps = {},
  style = {},
}: BtnType) {
  const { animScaleStyle, pressHandlers } = usePressAnimScale();

  const animation = useAnimPress ? animScaleStyle : {};
  const handlers = useAnimPress ? pressHandlers : {};

  const currentVariant = BtnVariantStyle[variant];

  return (
    <Pressable onPress={onPress} disabled={isDisabled || isLoading} {...handlers}>
      <Animated.View style={[styles.btn, currentVariant.btn, style, animation]}>
        {isLoading ? (
          <ActivityIndicator color={COLORS[currentVariant.text]} size="small" />
        ) : (
          <Txt color={currentVariant.text} isBold {...textProps}>
            {text}
          </Txt>
        )}
      </Animated.View>
    </Pressable>
  );
}
