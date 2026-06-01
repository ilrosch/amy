import { COLORS } from '@/shared/config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  box: {
    width: 55,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    backgroundColor: COLORS.secondary,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
