import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/src/assets/tokens';

export type BtnIconFixedType = {
  style?: { btn?: StyleProp<ViewStyle>; btnPressed?: StyleProp<ViewStyle> };
  handle?: () => void;
} & PressableProps;

export default function BtnIconFixed({ handle, style = {}, ...props }: BtnIconFixedType) {
  return (
    <Pressable
      onPress={handle}
      style={({ pressed }) => [
        styles.btn,
        style.btn,
        pressed && styles.btnPressed && style.btnPressed,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },

  btnPressed: {
    backgroundColor: Colors.primaryPressed,
  },
});
