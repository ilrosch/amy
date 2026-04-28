import { Alert, Animated, BackHandler, StyleSheet, View } from 'react-native';
import BtnRounded from '@/src/components/shared/buttons/BtnRounded';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import LinkUnderline from '@/src/components/shared/links/LinkUnderline';
import ThemedText from '@/src/components/shared/ThemedText';
import { Colors } from '@/src/assets/tokens';
import Owl from '@/src/assets/icons/owl';
import SafeScrollView from '@/src/components/shared/views/SafeScrollView';
import { useFadeIn } from '@/src/hooks/animations/use-fade-in';
import { useFadeUp } from '@/src/hooks/animations/use-fade-up';
import { useSlideUp } from '@/src/hooks/animations/use-slide-up';

export default function First() {
  const { t } = useTranslation();
  const router = useRouter();

  const imgBoxAnim = useFadeIn({ duration: 600 });
  const owlAnim = useSlideUp({ value: 300, delay: 800 });
  const textBoxAnim = useFadeUp();
  const btnBoxAnim = useFadeUp({ delay: 600 });

  const handleExit = () => {
    Alert.alert(t('app.exit_title'), t('app.exit_text'), [
      { text: t('app.btn_cancel'), style: 'cancel' },
      {
        text: t('app.btn_exit'),
        onPress: BackHandler.exitApp,
      },
    ]);
  };

  return (
    <SafeScrollView>
      <View style={styles.container}>
        <Animated.View style={[styles.imgBox, imgBoxAnim]}>
          <Animated.View style={owlAnim}>
            <Owl />
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.contentBox, textBoxAnim]}>
          <ThemedText title size="xl">
            {t('welcome.title_1')}
          </ThemedText>
          <ThemedText>
            <Trans
              i18nKey={'welcome.text_1'}
              components={[
                <Link
                  key="link"
                  href="/rules"
                  style={{ textDecorationLine: 'underline', color: Colors.primary }}
                />,
              ]}
            />
          </ThemedText>
        </Animated.View>
        <Animated.View style={[styles.btnBox, btnBoxAnim]}>
          <BtnRounded name={t('welcome.btn_agree')} onPress={() => router.push('/second')} />
          <LinkUnderline title name={t('app.btn_exit')} onPress={handleExit} />
        </Animated.View>
      </View>
    </SafeScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  imgBox: {
    flex: 1,
    maxWidth: 280,
    maxHeight: 280,
    aspectRatio: 1 / 1,
    paddingTop: 55,
    paddingHorizontal: 50,
    borderRadius: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.bgImage,
    overflow: 'hidden',
  },
  contentBox: {
    flex: 1,
    gap: 6,
  },
  btnBox: {
    gap: 16,
  },
});
