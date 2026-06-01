import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app-root/store';
import { ContactStatus, selectContactByID } from '@/entities/Contact';
import { BtnGroup, BtnGroupItem } from '@/shared/ui/buttons/BtnGroup';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { confirmModal } from '@/shared/lib/modal/confirm';
import { useSpinner } from '@/app-root/providers/SpinnerProvider';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/shared/config/routes';
import { useDeleteContact } from '@/features/delete-contact';

export type ContactsActionsType = {
  contactID: string;
};

export default function ContactActions({ contactID }: ContactsActionsType) {
  const { t } = useTranslation('manageContact');
  const router = useRouter();
  const { showLoader, hideLoader } = useSpinner();
  const contact = useAppSelector((s) => selectContactByID(s, contactID));
  const { handleDeleteContact } = useDeleteContact();

  // const { handleAcceptContact } = useAcceptContact();
  // const { handleRejectContact } = useRejectContact();
  // const { handleResendContact } = useResendContact();

  const handleRequestInvite = useCallback(async () => {
    // const executeAction = async () => {
    //   switch (action) {
    //     case InviteAction.ACCEPT:
    //       return handleAcceptContact(contact);
    //     case InviteAction.REJECT:
    //       return handleRejectContact(contact);
    //     case InviteAction.RESEND:
    //       return handleResendContact(contact);
    //   }
    // };
    // const needsConfirm = [InviteAction.REJECT, InviteAction.REVOKE].includes(action);
    // if (needsConfirm) {
    //   const confirmed = await confirmModal();
    //   if (!confirmed) return;
    // }
    // showLoader();
    // try {
    //   await executeAction();
    // } catch (err) {
    //   Alert.alert(t('errors:unknown'), t('errors:unknownText'));
    //   console.error('failed to invite contact:', err);
    // } finally {
    //   hideLoader();
    // }
  }, []);

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
            onPress: () => handleDeleteContact(contactID),
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
