import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeView({ ...props }: ViewProps) {
  const insets = useSafeAreaInsets();

  const viewStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  };

  return <View style={viewStyle} {...props} />;
}
