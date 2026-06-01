import { COLORS } from '@/shared/config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 35,
  },
  boxImage: {
    flex: 1,
    maxWidth: 280,
    maxHeight: 280,
    aspectRatio: 1 / 1,
    paddingTop: 55,
    paddingHorizontal: 50,
    marginTop: 35,
    borderRadius: '100%',
    backgroundColor: COLORS.bgSecondary,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  boxBtn: {
    gap: 16,
  },
  boxText: {
    gap: 6,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
