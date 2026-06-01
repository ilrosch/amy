import { useTranslation } from 'react-i18next';
import { RenameUserForm } from '@/features/rename-user';
import { ModalView } from '@/shared/ui/views/ModalView';

export default function RenameUser() {
  const { t } = useTranslation('renameUser');

  return (
    <ModalView title={t('title')} text={t('text')}>
      <RenameUserForm />
    </ModalView>
  );
}
