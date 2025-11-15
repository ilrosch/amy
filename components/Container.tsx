import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

export type ContainerProps = ViewProps & {
  style?: ViewStyle | ViewStyle[];
};

export default function Container({ style, ...props }: ContainerProps) {
  return <View style={[styles.container, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
});
