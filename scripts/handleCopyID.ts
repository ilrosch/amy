import { i18nextInstance } from '@/lib/i18n';
import { store } from '@/lib/store';
import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';
import { showToast } from './toast';

export const handleCopyCurrentID = async () => {
  const t = i18nextInstance.t;
  try {
    const { id } = store.getState().auth;
    await Clipboard.setStringAsync(id as string);
    showToast({ type: 'success', text1: t('toast.copy-id') });
  } catch (err) {
    console.log('Failed copy current ID:', err);
    Alert.alert(t('errors.error'), `${t('errors.copy-id')}: ${err}`);
  }
};

export const handleCopy = async (value: string) => {
  const t = i18nextInstance.t;
  try {
    await Clipboard.setStringAsync(value);
    showToast({ type: 'success', text1: t('toast.copy') });
  } catch (err) {
    console.log('Failed copy value:', err);
    Alert.alert(t('errors.error'), `${t('errors.copy')}: ${err}`);
  }
};
