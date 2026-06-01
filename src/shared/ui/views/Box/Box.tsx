import { COLORS } from '@/shared/config/theme';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

export type BoxType = {
  style?: StyleProp<ViewStyle>;
} & ViewProps;

export function Box({ style = {}, ...props }: BoxType) {
  return <View style={[styles.box, style]} {...props} />;
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.borderSecondary,
    backgroundColor: COLORS.white,
  },
});
