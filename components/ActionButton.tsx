import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

export type ActionButtonProps = {
  style?: ViewStyle | ViewStyle[];
  title?: string;
  source?: ImageSourcePropType;
  handle?: () => void;
};

export default function ActionButton({
  style,
  title,
  source,
  handle,
}: ActionButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPress : {},
        style,
      ]}
      onPress={handle}
    >
      <Image source={source} style={styles.buttonIcon} />
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    minHeight: 70,
    maxWidth: "50%",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  buttonPress: {
    opacity: 0.8,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginBottom: 6,
    tintColor: "rgba(21, 21, 21, 0.6)",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0.1,
    color: "#15151599",
    textAlign: "center",
  },
});
