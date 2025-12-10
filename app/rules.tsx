import { FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/assets/tokens';

import SafeView from '@/components/shared/SafeView';
import ThemedText from '@/components/shared/ThemedText';
import Back from '@/components/shared/Back';

export default function Rules() {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const rules = Object.entries(t('rules.rules', { returnObjects: true }));

  return (
    <SafeView style={styles.container}>
      <View style={styles.titleBox}>
        <ThemedText title={true} size="xl" style={{ color: Colors.white }}>
          {t('rules.title')}
        </ThemedText>
      </View>
      <FlatList
        data={rules}
        keyExtractor={(item) => item[0]}
        renderItem={({ item: [num, items] }) => (
          <View style={{ gap: 4 }}>
            {Object.entries(items).map(([key, value]) => (
              <ThemedText key={key} style={{ color: Colors.textDark, textAlign: 'left' }}>
                {`${num}.${key === '0' ? '' : key} ${value}`}
              </ThemedText>
            ))}
          </View>
        )}
        style={styles.textBox}
        contentContainerStyle={[styles.textBoxContent, { paddingBottom: bottom + 84 }]}
      />
      <Back />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.primary,
    paddingBottom: 0,
  },
  titleBox: {
    flexGrow: 1,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  textBox: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textBoxContent: {
    paddingTop: 32,
    paddingHorizontal: 24,
    gap: 24,
  },
});
