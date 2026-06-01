import { Alert } from 'react-native';
import { i18nInstance } from '@/shared/config/i18n';

interface SuccessOptions {
  title?: string;
  message?: string;
  ok?: string;
  style?: 'default' | 'destructive' | 'cancel';
}

export const showModal = ({
  title,
  message,
  ok,
  style = 'default',
}: SuccessOptions = {}): Promise<boolean> => {
  return new Promise((resolve) => {
    title = title || i18nInstance.t('common:success.title');
    message = message || i18nInstance.t('common:success.message');
    ok = ok || i18nInstance.t('common:confirm.btn');

    Alert.alert(title, message, [{ text: ok, onPress: () => resolve(true), style }], {
      cancelable: false,
    });
  });
};
