import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

export const useValidateName = () => {
  const { t } = useTranslation('user');

  const handleTooShort = useCallback(() => {
    Alert.alert(t('nameTooShort'), t('nameTooShortText'));
  }, [t]);

  const handleTooLong = useCallback(() => {
    Alert.alert(t('nameTooLong'), t('nameTooLongText'));
  }, [t]);

  const validate = useCallback(
    (userName: string) => {
      if (userName.length < 2) {
        handleTooShort();
        return false;
      }
      if (userName.length > 255) {
        handleTooLong();
        return false;
      }

      return true;
    },
    [handleTooLong, handleTooShort],
  );

  return { validate };
};
