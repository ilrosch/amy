import { useCallback } from 'react';
import { Contact, ContactStatus, saveContact } from '@/entities/Contact';
import { updateContact } from '@/entities/Contact/model/slice';
import { useAppDispatch } from '@/app-root/store';
import { useAcceptContactMutation } from '../api/contactStatusAPI';

export const useAcceptContact = () => {
  const dispatch = useAppDispatch();
  const [acceptContact] = useAcceptContactMutation();

  const handleAcceptContact = useCallback(
    async (contact: Contact) => {
      await acceptContact(contact.id).unwrap();
      const updated = { ...contact, status: ContactStatus.ACCEPTED };
      await saveContact(updated);
      dispatch(updateContact({ contactID: contact.id, changes: updated }));
    },
    [acceptContact, dispatch],
  );

  return { handleAcceptContact };
};
