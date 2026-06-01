import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@/shared/ui/blocks/Form';
import { useAddContact } from '../hooks';
import { Alert } from 'react-native';
import { ERRORS } from '@/shared/config/errors';

export type AddContactFormType = {
  onSuccess: () => void;
};

export default function AddContactForm({ onSuccess }: AddContactFormType) {
  const { t } = useTranslation('addContactFeather');
  const { handleAddContact } = useAddContact();

  const handleSubmit = useCallback(
    async (contactID: string) => {
      const errCode = await handleAddContact(contactID);
      if (!errCode) return onSuccess();

      let titleKey: string = 'errors:unknown';
      let textKey: string = 'errors:unknownText';

      switch (errCode) {
        case ERRORS.INVALID_FORMAT:
          titleKey = 'invalidFormat';
          textKey = 'invalidFormatText';
          break;
        case ERRORS.ALREADY_EXISTS:
          titleKey = 'alreadyExists';
          textKey = 'alreadyExistsText';
          break;
      }

      Alert.alert(t(titleKey), t(textKey));
    },
    [handleAddContact, onSuccess, t],
  );

  return (
    <Form
      inputProps={{ placeholder: t('placeholder') }}
      btnProps={{ text: t('btn') }}
      onSubmit={handleSubmit}
    />
  );
}
