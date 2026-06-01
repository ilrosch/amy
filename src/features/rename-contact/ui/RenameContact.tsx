import { Form } from '@/shared/ui/blocks/Form';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRenameContact } from '../model/useRenameContact';
import { useAppSelector } from '@/app-root/store';
import { selectContactByID } from '@/entities/Contact';
import { useBack } from '@/shared/lib/hooks/useBack';

export default function RenameContactForm({ contactID }: { contactID: string }) {
  const { t } = useTranslation('renameContactFeather');
  const handleBack = useBack();
  const contact = useAppSelector((s) => selectContactByID(s, contactID));
  const { handleRenameContact } = useRenameContact();

  const handleSubmit = useCallback(
    async (contactName: string) => {
      await handleRenameContact(contact, contactName);
      handleBack();
    },
    [contact, handleBack, handleRenameContact],
  );

  return (
    <Form
      initValue={contact.name}
      inputProps={{ placeholder: t('placeholder') }}
      btnProps={{ text: t('btn') }}
      onSubmit={handleSubmit}
    />
  );
}
