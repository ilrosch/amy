import { useAppDispatch } from '@/app-root/store';
import { Contact, updateContact, updateContactDB } from '@/entities/contact';
import { useCallback } from 'react';

export const useRenameContact = () => {
  const dispatch = useAppDispatch();

  const handleRenameContact = useCallback(
    async (contact: Contact, contactName: string) => {
      try {
        const newContact: Contact = { ...contact, name: contactName };
        await updateContactDB(newContact);
        dispatch(updateContact({ contactID: contact.id, changes: newContact }));
      } catch (err) {
        console.error('failed to save new contact name:', err);
      }
    },
    [dispatch],
  );

  return { handleRenameContact };
};
