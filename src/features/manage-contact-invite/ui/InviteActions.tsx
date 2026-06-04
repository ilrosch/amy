import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app-root/store';
import { ContactStatus, selectContactByID } from '@/entities/contact';
import { BtnGroup, BtnGroupItem } from '@/shared/ui/buttons/BtnGroup';
import { useAcceptContact } from '../model/useAcceptContact';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { confirmModal } from '@/shared/lib/modal/confirm';
import { useSpinner } from '@/app-root/providers/SpinnerProvider';
import { useRejectContact } from '../model/useRejectContact';
import { useResendContact } from '../model/useResendContact';

export type InviteActionsType = {
  contactID: string;
};

export enum InviteAction {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  RESEND = 'RESEND',
  REVOKE = 'REVOKE',
}

export default function InviteActions({ contactID }: InviteActionsType) {
  const { t } = useTranslation('manageContactInvite');
  const { showLoader, hideLoader } = useSpinner();
  const contact = useAppSelector((s) => selectContactByID(s, contactID));

  const { handleAcceptContact } = useAcceptContact();
  const { handleRejectContact } = useRejectContact();
  const { handleResendContact } = useResendContact();

  const handleRequestInvite = useCallback(
    async (action: InviteAction) => {
      const executeAction = async () => {
        switch (action) {
          case InviteAction.ACCEPT:
            return handleAcceptContact(contact);
          case InviteAction.REJECT:
            return handleRejectContact(contact);
          case InviteAction.RESEND:
            return handleResendContact(contact);
        }
      };

      const needsConfirm = [InviteAction.REJECT, InviteAction.REVOKE].includes(action);
      if (needsConfirm) {
        const confirmed = await confirmModal();
        if (!confirmed) return;
      }

      showLoader();
      try {
        await executeAction();
      } catch (err) {
        Alert.alert(t('errors:unknown'), t('errors:unknownText'));
        console.error('failed to invite contact:', err);
      } finally {
        hideLoader();
      }
    },
    [
      contact,
      handleAcceptContact,
      handleRejectContact,
      handleResendContact,
      hideLoader,
      showLoader,
      t,
    ],
  );

  if (!contact) return null;

  const getActionsItems = () => {
    switch (contact.status) {
      case ContactStatus.NEW:
        return [
          {
            text: t('actions.accept'),
            onPress: () => handleRequestInvite(InviteAction.ACCEPT),
          },
          {
            text: t('actions.reject'),
            onPress: () => handleRequestInvite(InviteAction.REJECT),
          },
        ];
      case ContactStatus.ACCEPTED:
        return [
          {
            text: t('actions.reject'),
            onPress: () => handleRequestInvite(InviteAction.REJECT),
          },
        ];
      case ContactStatus.REJECTED:
        return [
          {
            text: t('actions.resend'),
            onPress: () => handleRequestInvite(InviteAction.RESEND),
          },
        ];
      case ContactStatus.PENDING:
        return [
          {
            text: t('actions.revoke'),
            onPress: () => handleRequestInvite(InviteAction.REJECT),
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
