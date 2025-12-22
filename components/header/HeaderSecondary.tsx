import { StyleSheet, View } from 'react-native';
import ThemedText from '../shared/ThemedText';
import { HeaderType } from './Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HeaderSecondary({ title }: HeaderType) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: top }]}>
      <ThemedText title={true} style={styles.headerTitle}>
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#86A788',
  },
  headerBtn: {
    padding: 12,
  },
  headerTitle: {
    color: '#ffffff',
  },
});
