import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/src/assets/tokens';
import ThemedText, { TextSizeType } from '../shared/ThemedText';

export type HeaderType = {
  title: string;
  topSize?: number;
  bottomSize?: number;
  textSize?: TextSizeType;
};

export default function Header({
  title,
  topSize = 32,
  bottomSize = 46,
  textSize = 'xl',
}: HeaderType) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.headerBox, { paddingTop: top + topSize, paddingBottom: bottomSize }]}>
      <ThemedText size={textSize} title={true} style={styles.title}>
        {title.toUpperCase()}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    minHeight: 120,
    backgroundColor: Colors.primary,
  },

  title: {
    color: Colors.white,
  },
});
