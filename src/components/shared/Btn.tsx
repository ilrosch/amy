import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import ThemedText from './ThemedText';
import { Colors } from '@/src/assets/tokens';

export type BtnType = {
  btnText: string;
  loadStatus: boolean;
  handler: () => void;
  color: 'success' | 'danger';
  styleBtn?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
};

const colorSchemes = {
  success: { bg: Colors.primary, press: Colors.primaryPressed },
  danger: { bg: Colors.danger, press: Colors.dangerPressed },
} as const;

export default function Btn({ btnText, loadStatus, handler, color, styleBtn, styleText }: BtnType) {
  return (
    <Pressable
      disabled={loadStatus}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colorSchemes[color].bg },
        pressed && { backgroundColor: colorSchemes[color].press },
        styleBtn,
      ]}
      onPress={handler}
    >
      {loadStatus ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <ThemedText title={true} style={[styles.buttonText, styleText]}>
          {btnText}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 14,
    minHeight: 48,
  },

  buttonText: {
    color: Colors.white,
  },
});
