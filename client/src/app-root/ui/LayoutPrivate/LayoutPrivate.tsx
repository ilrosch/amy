import { SocketProvider } from '@/app-root/providers/SocketProvider';
import { Header } from '@/shared/ui/views/Header';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export function LayoutPrivate() {
  const { t } = useTranslation('pages');

  return (
    <SocketProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'ios_from_right' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="(modals)"
          options={{
            animation: 'fade',
            animationDuration: 300,
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />

        <Stack.Screen
          name="[id]/profile"
          options={{ header: () => <Header text={t('profile')} />, headerShown: true }}
        />
      </Stack>
    </SocketProvider>
  );
}
