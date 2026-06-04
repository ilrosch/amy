import { ROUTES } from '@/shared/config/routes';
import { BtnGroup, BtnGroupItem } from '@/shared/ui/buttons/BtnGroup';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useDeleteUser } from '../model/useDeleteUser';
import { share } from '@/shared/lib/share';
import { useAppSelector } from '@/app-root/store';
import { selectUserID } from '@/entities/user';

export default function UserActions() {
  const { t } = useTranslation('userManage');
  const userID = useAppSelector(selectUserID);
  const router = useRouter();

  const { handleDeleteUser } = useDeleteUser();

  const items: BtnGroupItem[] = [
    {
      text: t('actions.rename'),
      onPress: () => {
        router.push(ROUTES.USER.RENAME);
      },
    },
    {
      text: t('actions.share'),
      onPress: () =>
        share({
          message: t('invite_message', { id: userID }),
        }),
    },
    {
      text: t('actions.delete'),
      onPress: handleDeleteUser,
      btnProps: { variant: 'danger' },
    },
  ];

  return <BtnGroup text={t('title')} items={items} />;
}
