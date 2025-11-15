import { StyleSheet, ViewStyle, View } from "react-native";

export type SeparatorLineProps = {
  style?: ViewStyle | ViewStyle[];
};

export default function SeparatorLine({ style }: SeparatorLineProps) {
  return <View style={[styles.line, style]} />;
}

const styles = StyleSheet.create({
  line: {
    width: 120,
    height: 2,
    backgroundColor: "rgba(217, 217, 217, 1.0)",
    alignSelf: "center",
    marginVertical: 12,
  },
});
