import { UseFadeIn, useFadeIn } from '@/shared/lib/hooks/useFadeIn';
import { useSlideUp, UseSlideUp } from '@/shared/lib/hooks/useSlideUp';
import { Animated, StyleProp, ViewProps, ViewStyle } from 'react-native';

export type AnimVariant = 'fadeIn' | 'fadeUp' | 'slideUp';

type AnimConf = UseFadeIn | UseSlideUp;

export type AnimViewType = {
  variant: AnimVariant;
  conf?: AnimConf;
  style?: StyleProp<ViewStyle>;
} & ViewProps;

export function AnimView({ variant, conf = {}, style = {}, ...props }: AnimViewType) {
  const fadeInStyle = useFadeIn(conf);
  const slideUpStyle = useSlideUp(conf);

  const animStyle: Record<AnimVariant, any> = {
    fadeIn: fadeInStyle,
    fadeUp: { ...fadeInStyle, ...slideUpStyle },
    slideUp: slideUpStyle,
  };

  return <Animated.View style={[style, animStyle[variant]]} {...props} />;
}
