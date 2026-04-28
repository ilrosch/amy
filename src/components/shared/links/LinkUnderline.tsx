import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import ThemedText, { ThemedTextType } from '../ThemedText';

export type LinkUnderlineType = {
  name?: string;
  style?: StyleProp<TextStyle>;
} & ThemedTextType;

export default function LinkUnderline({ name, onPress, style, ...props }: LinkUnderlineType) {
  return (
    <ThemedText style={[styles.text, style]} onPress={onPress} {...props}>
      {name}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  },
});
