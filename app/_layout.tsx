import { useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import '@/src/lib/i18n';
import { store } from '@/src/lib/store';
import { useAppSelector } from '@/src/lib/store/hooks';

import Header from '@/src/components/header/Header';
import Toast from 'react-native-toast-message';
import { selectTokenString } from '@/src/lib/store/slices/user';
import { prepareData } from '@/src/scripts/app/prepare/all';
import { useNotification } from '@/src/hooks/notification/use-notification';

SplashScreen.setOptions({ duration: 1000, fade: true });
SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const { t } = useTranslation();
  const token = useAppSelector(selectTokenString);

  const [isReady, setIsReady] = useState<boolean>(false);

  useNotification();

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  useEffect(() => {
    (async () => {
      try {
        await prepareData();
      } catch (err) {
        console.log('Prepare data:', err);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  if (!isReady) {
    return null;
  }

  console.log(token);

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'ios_from_right' }}>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="(screens)/profile/[id]"
          options={{
            headerShown: true,
            header: () => <Header title={t('pages.profile')} />,
          }}
        />
        <Stack.Screen name="(screens)/chat/[id]" />
        <Stack.Screen name="(screens)/call/[id]" />

        {/* <Stack.Screen
          name="(modals)/new-chat"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 300,
          }}
        /> */}
        <Stack.Screen
          name="(modals)/add-contact"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 300,
          }}
        />
        <Stack.Screen
          name="(modals)/rename-contact"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 300,
          }}
        />

        {/* <Stack.Screen
          name="(modals)/clear-chat"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 300,
          }}
        /> */}
        {/* <Stack.Screen
          name="(modals)/remove-chat"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 300,
          }}
        /> */}
        {/* <Stack.Screen
          name="(modals)/rename-user"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 300,
          }}
        /> */}
      </Stack.Protected>
      <Stack.Screen name="(sign-in)/first" />
      <Stack.Screen name="(sign-in)/second" />
      <Stack.Screen name="(screens)/rules" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <LayoutContent />
          <Toast autoHide position={'top'} visibilityTime={3000} swipeable />
        </Provider>
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </>
  );
}
