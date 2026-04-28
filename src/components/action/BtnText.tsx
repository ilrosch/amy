import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import ThemedText from '../shared/ThemedText';
import { Colors } from '@/src/assets/tokens';

export type BtnTextType = {
  type?: 'danger';
  title: string;
  handle?: () => void;
  style?: { btn: StyleProp<ViewStyle>; text: StyleProp<TextStyle> };
};

export default function BtnText({ type, title, handle, style = {} }: BtnTextType) {
  const currentStyle =
    type === 'danger'
      ? { btn: styles.btnDanger, text: styles.textDanger }
      : { btn: styles.btn, text: styles.text };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        currentStyle.btn,
        style?.btn,
        pressed && styles.buttonPress,
      ]}
      onPress={handle}
    >
      <ThemedText size="s" style={[currentStyle.text, style?.text]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
  },
  buttonPress: {
    opacity: 0.8,
  },
  btn: {
    borderWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.label,
  },
  btnDanger: {
    backgroundColor: Colors.danger,
  },
  text: {
    color: Colors.textDark,
  },
  textDanger: {
    color: Colors.white,
  },
});
