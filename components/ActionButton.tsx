import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import ThemedText from "./ThemedText";

export type ActionButtonProps = {
  title?: string;
  source?: ImageSourcePropType;
  style?: ViewStyle | ViewStyle[];
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
        style,
        pressed && styles.buttonPress,
      ]}
      onPress={handle}
    >
      <Image source={source} style={styles.buttonIcon} />
      <ThemedText title={true} size={"s"} style={styles.buttonText}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.05,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: "30%",
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
    color: "#15151599",
  },
});
