import { Alert } from 'react-native';
import { i18nInstance } from '@/shared/config/i18n';

interface ConfirmOptions {
  title?: string;
  message?: string;
  confirm?: string;
  cancel?: string;
  style?: 'default' | 'destructive' | 'cancel';
}

export const confirmModal = ({
  title,
  message,
  confirm,
  cancel,
  style = 'default',
}: ConfirmOptions = {}): Promise<boolean> => {
  return new Promise((resolve) => {
    title = title || i18nInstance.t('common:confirm.title');
    message = message || i18nInstance.t('common:confirm.message');
    confirm = confirm || i18nInstance.t('common:confirm.btn');
    cancel = cancel || i18nInstance.t('common:btnCancel');

    Alert.alert(
      title,
      message,
      [
        { text: cancel, onPress: () => resolve(false), style: 'cancel' },
        { text: confirm, onPress: () => resolve(true), style },
      ],
      { cancelable: false },
    );
  });
};
