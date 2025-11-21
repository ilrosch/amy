import { StyleSheet, ViewStyle, View, StyleProp } from "react-native";

export type SeparatorLineProps = {
  style?: StyleProp<ViewStyle>;
};

export default function SeparatorLine({ style }: SeparatorLineProps) {
  return <View style={[styles.line, style]} />;
}

const styles = StyleSheet.create({
  line: {
    width: 120,
    height: 2,
    alignSelf: "center",
    marginVertical: 12,
  },
});
