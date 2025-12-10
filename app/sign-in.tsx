import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAppDispatch } from '@/lib/store/hooks';
import { addAuth } from '@/lib/store/slices/auth';
import createAccount from '@/scripts/handlers/createAccount';

import { Colors } from '@/assets/tokens';
import AmyLogo from '@/assets/icons/amy-logo';

import SafeView from '@/components/shared/SafeView';
import Form, { FormDataType } from '@/components/shared/Form';
import ThemedText from '@/components/shared/ThemedText';
import Loader from '@/components/Loader';

export default function SingIn() {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async ({ value }: FormDataType) => {
    setLoading(true);

    try {
      const authData = await createAccount(value);
      dispatch(addAuth(authData));
      router.replace('/');
    } catch (err) {
      let message;
      switch (err) {
        case 'ERR_VALID_NAME':
          message = 'errors.invalid-name';
          break;
        case 'ERR_NETWORK':
          message = 'errors.server';
          break;
        default:
          message = 'errors.unknown';
      }

      Alert.alert(t('errors.error'), t(message));
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <SafeView style={styles.container}>
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.welcomeBox}>
              <AmyLogo />
            </View>
            <View style={[styles.formBox, { paddingBottom: bottom + 24 }]}>
              <ThemedText size={'l'} title={true} style={styles.title}>
                {t('welcome.title')}
              </ThemedText>
              <View style={styles.textBox}>
                <ThemedText style={styles.text}>{t('welcome.text')}</ThemedText>
              </View>
              <Form buttonText={t('welcome.button')} placeholder={t('welcome.label')} handler={handleSubmit} />
              <View style={styles.rules}>
                <ThemedText size="xs" style={{ color: Colors.textDark }}>
                  {t('welcome.rule')}
                </ThemedText>
                <Pressable onPress={() => router.push('/rules')}>
                  <ThemedText size="xs" style={{ color: Colors.textDark, textDecorationLine: 'underline' }}>
                    {t('welcome.link')}
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingBottom: 0,
  },
  welcomeBox: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: Colors.titleDark,
    marginBottom: 16,
  },
  textBox: {
    paddingHorizontal: 24,
    marginHorizontal: -24,
    marginBottom: 32,
  },
  text: {
    color: Colors.textDark,
  },
  formBox: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  rules: {
    marginTop: 12,
  },
});
