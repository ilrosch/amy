import { COLORS } from '@/shared/config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  input: {
    flex: 1,
    minHeight: 45,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 40,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 30,
    borderColor: COLORS.borderSecondary,
    fontSize: 16,
    color: COLORS.textMain,
  },
  disabled: {
    opacity: 0.7,
  },
  focused: {
    borderColor: COLORS.primary,
  },
  clearBtn: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
});
