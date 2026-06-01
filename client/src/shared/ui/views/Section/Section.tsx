import { COLORS } from '@/shared/config/theme';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

export type SectionType = {
  style?: StyleProp<ViewStyle>;
} & ViewProps;

export function Section({ style = {}, ...props }: SectionType) {
  return <View style={[styles.section, style]} {...props} />;
}

const styles = StyleSheet.create({
  section: {
    flexGrow: 1,
    backgroundColor: COLORS.bgMain,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    zIndex: 10,
    overflow: 'hidden',
  },
});
