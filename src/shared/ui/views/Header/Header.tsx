import { StyleSheet, View } from 'react-native';
import { Txt } from '../../texts/Txt';
import { COLORS } from '@/shared/config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type HeaderType = {
  text: string;
  topPadding?: number;
  bottomPadding?: number;
};

export function Header({ text, topPadding = 32, bottomPadding = 46 }: HeaderType) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.box, { paddingTop: top + topPadding, paddingBottom: bottomPadding }]}>
      <Txt color="textContrast" size="xl" isBold>
        {text.toUpperCase()}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 120,
    backgroundColor: COLORS.primary,
    marginBottom: -30,
  },
});
