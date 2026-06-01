import { useSlideUp, UseSlideUp } from '@/shared/lib/hooks/useSlideUp';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export type SlideViewType = {
  style?: StyleProp<ViewStyle>;
  anim?: UseSlideUp;
} & ViewProps;

export function SlideView({ style = {}, anim = {}, ...props }: SlideViewType) {
  const 


  return <View style={[style, transformStyle]} {...props} />;
}
