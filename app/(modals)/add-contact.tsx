import { useRouter } from 'expo-router';
import { Alert, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import addContactHandler from '@/scripts/handlers/add-contact';

import ModalCustom from '@/components/modal/ModalCustom';
import Form from '@/components/shared/Form';
import { showToast } from '@/scripts/toast';

export default function AddContactModal() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = async ({ value }: { value: string }) => {
    try {
      await addContactHandler(value);
      showToast({ type: 'success', text1: t('toast.add-contact-success') });
      router.back();
    } catch (err) {
      let message;
      switch (err) {
        case 'ERR_VALID_NAME':
          message = 'errors.invalid-name';
          break;
        case 'ERR_NETWORK':
          message = 'errors.server';
          break;
        default:
          message = 'errors.unknown';
      }

      Alert.alert(t('errors.error'), t(message));
    }
  };

  return (
    <ModalCustom title={t('modal.add-contact')} text={t('modal.add-contact-text')}>
      <Form buttonText={t('modal.add-contact-btn')} placeholder={t('modal.add-contact-label')} handler={handleSubmit} />
    </ModalCustom>
  );
}
