import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app-root/store';
import { ContactStatus, selectContactByID } from '@/entities/contact';
import { BtnGroup, BtnGroupItem } from '@/shared/ui/buttons/BtnGroup';
import { confirmModal } from '@/shared/lib/modal/confirm';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/shared/config/routes';
import { useDeleteContact } from '@/features/delete-contact';

export type ContactsActionsType = {
  contactID: string;
};

export default function ContactActions({ contactID }: ContactsActionsType) {
  const router = useRouter();
  const { t } = useTranslation('manageContact');
  const contact = useAppSelector((s) => selectContactByID(s, contactID));
  const { handleDeleteContact } = useDeleteContact();

  if (!contact) return null;

  const getActionsItems = () => {
    switch (contact.status) {
      case ContactStatus.NEW:
      case ContactStatus.ACCEPTED:
      case ContactStatus.REJECTED:
      case ContactStatus.PENDING:
        return [
          {
            text: t('actions.rename'),
            onPress: () => router.push(ROUTES.CONTACT.RENAME(contactID)),
          },
          {
            text: t('actions.delete'),
            onPress: async () => {
              const confirmed = await confirmModal();
              if (!confirmed) return;

              await handleDeleteContact(contactID);
            },
            btnProps: { variant: 'danger' },
          },
        ];
      default:
        return [];
    }
  };

  const items = getActionsItems() as BtnGroupItem[];

  if (items.length === 0) return null;

  return <BtnGroup text={t('title')} items={items} />;
}
