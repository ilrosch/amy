import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/assets/tokens';
import ThemedText from '../shared/ThemedText';

export type HeaderType = {
  title: string;
};

export default function Header({ title }: HeaderType) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.headerBox, { paddingTop: top + 32 }]}>
      <ThemedText size={'xl'} title={true} style={styles.title}>
        {title.toUpperCase()}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: Colors.primary,
    paddingBottom: 16,
  },

  title: {
    color: Colors.white,
  },
});
