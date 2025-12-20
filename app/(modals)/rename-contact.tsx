import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import renameContactHandler from '@/scripts/handlers/rename-contact';
import { useAppSelector } from '@/lib/store/hooks';
import { selectContact } from '@/lib/store/slices/contacts';

import ModalCustom from '@/components/modal/ModalCustom';
import Form from '@/components/shared/Form';
import { showToast } from '@/scripts/toast';

export default function RenameContactModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id: contactID } = useLocalSearchParams<{ id: string }>();
  const { name: userName } = useAppSelector((state) => selectContact(state, contactID));

  const handleSubmit = async ({ value }: { value: string }) => {
    try {
      await renameContactHandler(value, contactID);
      showToast({ type: 'success', text1: t('toast.rename-contact') });
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
    <ModalCustom title={t('modal.rename-contact')} text={t('modal.rename-contact-text')}>
      <Form
        buttonText={t('modal.rename-contact-btn')}
        placeholder={t('modal.rename-contact-label')}
        valueField={userName}
        handler={handleSubmit}
      />
    </ModalCustom>
  );
}
