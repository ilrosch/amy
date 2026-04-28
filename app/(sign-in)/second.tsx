import { Alert, Animated, StyleSheet, View } from 'react-native';
import BtnRounded from '@/src/components/shared/buttons/BtnRounded';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import LinkUnderline from '@/src/components/shared/links/LinkUnderline';
import ThemedText from '@/src/components/shared/ThemedText';
import { Colors } from '@/src/assets/tokens';
import SafeScrollView from '@/src/components/shared/views/SafeScrollView';
import { useFadeIn } from '@/src/hooks/animations/use-fade-in';
import { useFadeUp } from '@/src/hooks/animations/use-fade-up';
import { useSlideUp } from '@/src/hooks/animations/use-slide-up';
import OwlEyes from '@/src/assets/icons/owl-eyes';
import Input from '@/src/components/shared/inputs/Input';
import { useState } from 'react';
import { createUser } from '@/src/scripts/app/handlers/user/create';
import Loader from '@/src/components/Loader';

export default function Second() {
  const { t } = useTranslation();
  const router = useRouter();

  const imgBoxAnim = useFadeIn({ duration: 600 });
  const owlAnim = useSlideUp({ value: 300, delay: 800 });
  const textBoxAnim = useFadeUp();
  const btnBoxAnim = useFadeUp({ delay: 600 });

  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (name: string) => {
    const normalizeName = name.trim();
    if (normalizeName.length === 0) return;
    if (normalizeName.length < 2 || normalizeName.length > 255) {
      Alert.alert(t('errors.error_username'), t('errors.error_username_text'));
      return;
    }
    try {
      setLoading(true);
      await createUser(normalizeName);
      router.replace('/');
    } catch (err) {
      Alert.alert(t('errors.error'), err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScrollView>
      <View style={styles.container}>
        <Animated.View style={[styles.imgBox, imgBoxAnim]}>
          <Animated.View style={owlAnim}>
            <OwlEyes />
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.contentBox, textBoxAnim]}>
          <ThemedText title size="xl">
            {t('welcome.title_2')}
          </ThemedText>
          <ThemedText>{t('welcome.text_2')}</ThemedText>
          <View style={[styles.formBox]}>
            <Input
              value={userName}
              setValue={setUserName}
              placeholder={t('welcome.placeholder')}
              loading={loading}
            />
            <ThemedText>{t('welcome.tip')}</ThemedText>
          </View>
        </Animated.View>
        <Animated.View style={[styles.btnBox, btnBoxAnim]}>
          <BtnRounded name={t('welcome.btn_create')} onPress={async () => handleSubmit(userName)} />
          <LinkUnderline title name={t('app.btn_back')} onPress={router.back} />
        </Animated.View>
      </View>
      {loading && <Loader />}
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
  formBox: {
    marginTop: 16,
    gap: 12,
  },
  btnBox: {
    gap: 16,
  },
});
