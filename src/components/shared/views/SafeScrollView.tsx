import { Colors } from '@/src/assets/tokens';
import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SafeScrollViewType = {
  style?: StyleProp<ViewStyle>;
} & ScrollViewProps;

export default function SafeScrollView({ style, ...props }: SafeScrollViewType) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
        paddingHorizontal: 24,
        flexGrow: 1,
      }}
      style={[
        {
          flex: 1,
          backgroundColor: Colors.white,
        },
        style,
      ]}
      {...props}
    />
  );
}
