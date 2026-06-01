import { RenameContactForm } from '@/features/rename-contact';
import { ModalView } from '@/shared/ui/views/ModalView';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function RenameContact() {
  const { t } = useTranslation('renameContact');
  const { id: contactID } = useLocalSearchParams<{ id: string }>();

  return (
    <ModalView title={t('title')} text={t('text')}>
      <RenameContactForm contactID={contactID} />
    </ModalView>
  );
}
