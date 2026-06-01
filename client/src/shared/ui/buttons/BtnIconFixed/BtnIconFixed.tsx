import { COLORS } from '@/shared/config/theme';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type BtnIconFixedType = { style?: StyleProp<ViewStyle> } & TouchableOpacityProps;

export function BtnIconFixed({ style, ...props }: BtnIconFixedType) {
  return <TouchableOpacity activeOpacity={0.9} style={[styles.btn, style]} {...props} />;
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    aspectRatio: 1 / 1,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
});
