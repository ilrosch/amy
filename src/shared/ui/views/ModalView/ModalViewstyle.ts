import { COLORS } from '@/shared/config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    padding: 6,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.bgOverlay,
  },
  container: {
    paddingVertical: 24,
  },
  modal: {
    maxHeight: '100%',
  },
  modalBody: {
    paddingTop: 42,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: COLORS.bgMain,
    gap: 16,
  },
  close: {
    width: 60,
    aspectRatio: 1 / 1,
    borderWidth: 1,
    borderRadius: 100,
    elevation: 0.3,
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: -30,
    zIndex: 1,
  },
});
