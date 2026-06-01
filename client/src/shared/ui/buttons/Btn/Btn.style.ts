import { COLORS } from '@/shared/config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    borderWidth: 1,
    borderColor: COLORS.borderSecondary,
    backgroundColor: COLORS.bgSecondary,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
});
