import { useAppSelector } from '@/app-root/store';
import { selectUser } from '@/entities/user';
import { Form } from '@/shared/ui/blocks/Form';
import { useTranslation } from 'react-i18next';
import { useRenameUser } from '../model/useRenameUser';

export default function RenameUserForm() {
  const { t } = useTranslation('renameUser');
  const user = useAppSelector(selectUser);

  const { handleRenameUser } = useRenameUser();

  return (
    <Form
      initValue={user?.name}
      inputProps={{ placeholder: t('placeholder') }}
      btnProps={{ text: t('btn') }}
      onSubmit={handleRenameUser}
    />
  );
}
