import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/src/lib/store/hooks';
import { selectContact } from '@/src/lib/store/slices/contacts';

import ModalCustom from '@/src/components/modal/ModalCustom';
import Form from '@/src/components/shared/Form';
import { showToast } from '@/src/scripts/toast';
import renameContactHandler from '@/src/scripts/app/handlers/rename-contact';

export default function RenameContactModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id: contactID } = useLocalSearchParams<{ id: string }>();
  const { name: userName } = useAppSelector((state) => selectContact(state, contactID));

  const handleSubmit = async ({ value }: { value: string }) => {
    try {
      await renameContactHandler(contactID, value);
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
