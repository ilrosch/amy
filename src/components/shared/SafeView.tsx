import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SafeView({ style, ...props }: ViewProps) {
  const insets = useSafeAreaInsets();

  const viewStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    flex: 1,
  };

  return <View style={[viewStyle, style]} {...props} />;
}
