import { useCallback } from 'react';
import { Contact, ContactStatus, saveContact } from '@/entities/Contact';
import { updateContact } from '@/entities/Contact/model/slice';
import { useAppDispatch } from '@/app-root/store';
import { useRejectContactMutation } from '../api/contactStatusAPI';

export const useRejectContact = () => {
  const dispatch = useAppDispatch();
  const [rejectContact] = useRejectContactMutation();

  const handleRejectContact = useCallback(
    async (contact: Contact) => {
      await rejectContact(contact.id).unwrap();
      const updated = { ...contact, status: ContactStatus.REJECTED };
      await saveContact(updated);
      dispatch(updateContact({ contactID: contact.id, changes: updated }));
    },
    [rejectContact, dispatch],
  );

  return { handleRejectContact };
};
