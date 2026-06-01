import { AddContactForm } from '@/features/add-contact';
import { useBack } from '@/shared/lib/hooks/useBack';
import { ModalView } from '@/shared/ui/views/ModalView';
import { useTranslation } from 'react-i18next';

export default function AddContact() {
  const { t } = useTranslation('addContactModal');
  const handleBack = useBack();

  return (
    <ModalView title={t('title')} text={t('text')}>
      <AddContactForm onSuccess={handleBack} />
    </ModalView>
  );
}
