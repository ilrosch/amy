import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler } from 'react-native';

export const useExitApp = () => {
  const { t } = useTranslation();

  const handleExitApp = useCallback(() => {
    Alert.alert(t('common:titleExit'), t('common:textExit'), [
      { text: t('common:btnCancel'), style: 'cancel' },
      { text: t('common:btnExit'), onPress: BackHandler.exitApp },
    ]);
  }, [t]);

  return handleExitApp;
};
