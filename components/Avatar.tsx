import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import ThemedText, { TextSizeType } from "./ThemedText";

export type AvatarType = {
  name: string;
  sizeText: TextSizeType,
  styleBox?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
};

export default function Avatar({ name, sizeText, styleBox, styleText }: AvatarType) {
  const words = name.split(" ");
  const text = words.length < 2 ? name.slice(0, 2) : words[0][0] + words[1][0];

  return (
    <View style={[styles.avatar, styleBox]}>
      <ThemedText
        title={true}
        size={sizeText}
        style={[styles.avatarText, styleText]}
      >
        {text.toUpperCase()}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 55,
    height: 55,
    backgroundColor: "#E4B571",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#151515",
  },
});
