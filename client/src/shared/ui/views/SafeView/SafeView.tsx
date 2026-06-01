import { COLORS } from '@/shared/config/theme';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SafeViewType = { style?: StyleProp<ViewStyle> } & ViewProps;

export function SafeView({ style = {}, ...props }: SafeViewType) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: top,
          paddingBottom: bottom,
          backgroundColor: COLORS.white,
        },
        style,
      ]}
      {...props}
    />
  );
}
