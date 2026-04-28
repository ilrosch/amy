import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import ModalCustom from '@/src/components/modal/ModalCustom';
import Form from '@/src/components/shared/Form';
import { showToast } from '@/src/scripts/toast';
import { addContact } from '@/src/scripts/app/handlers/contact/add';

export default function AddContactModal() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = async ({ value }: { value: string }) => {
    try {
      await addContact(value);
      showToast({ type: 'success', text1: t('toast.add-contact-success') });
      router.back();
    } catch (message) {
      Alert.alert(t('errors.error'), message as string);
    }
  };

  return (
    <ModalCustom title={t('modal.add-contact')} text={t('modal.add-contact-text')}>
      <Form
        buttonText={t('modal.add-contact-btn')}
        placeholder={t('modal.add-contact-label')}
        handler={handleSubmit}
      />
    </ModalCustom>
  );
}
