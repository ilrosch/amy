import { StyleSheet, TouchableOpacity } from 'react-native';
import { Txt } from '../../texts/Txt';
import { COLORS } from '@/shared/config/theme';

export function BtnIcon({ text, children, ...props }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.btn} {...props}>
      {children}
      <Txt size="s" numberOfLines={1} ellipsizeMode="tail">
        {text}
      </Txt>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    minWidth: 80,
    maxWidth: 100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.borderSecondary,
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
});
