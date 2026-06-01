import { store } from '@/app-root/store';
import { i18nInstance } from '@/shared/config/i18n';
import { I18nextProvider } from 'react-i18next';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { LayoutRoot } from '../../ui/LayoutRoot';
import { StatusBar } from 'expo-status-bar';
import { InitProvider } from '../InitProvider/InitProvider';
import { SpinnerProvider } from '../SpinnerProvider';

export function AppProvider() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <InitProvider>
            <SpinnerProvider>
              <LayoutRoot />
            </SpinnerProvider>
          </InitProvider>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </I18nextProvider>
    </Provider>
  );
}
