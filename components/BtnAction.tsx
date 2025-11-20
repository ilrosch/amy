import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import ThemedText from "./ThemedText";

export type BtnActionType = {
  title?: string;
  handle?: () => void;
  styleBtn?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
};

export default function BtnAction({
  title,
  handle,
  styleBtn,
  styleText,
}: BtnActionType) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styleBtn,
        pressed && styles.buttonPress,
      ]}
      onPress={handle}
    >
      <ThemedText style={[styles.buttonText, styleText]}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    padding: 12,
  },
  buttonPress: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#151515CC",
  },
});
