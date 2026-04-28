import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';
import { i18nextInstance } from '@/src/lib/i18n';
import { showToast } from '../../toast';

export const copy = async (value: string) => {
  const t = i18nextInstance.t;
  try {
    await Clipboard.setStringAsync(value);
    showToast({ type: 'success', text1: t('toast.copy') });
  } catch (err) {
    console.log('Failed copy value:', err);
    Alert.alert(t('errors.error'), `${t('errors.copy')}: ${err}`);
  }
};
