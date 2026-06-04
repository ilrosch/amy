import { useCallback } from 'react';
import { Contact, ContactStatus, saveContact, updateContact } from '@/entities/contact';
import { useAppDispatch } from '@/app-root/store';
import { useResendContactMutation } from '../api/contactStatusAPI';

export const useResendContact = () => {
  const dispatch = useAppDispatch();
  const [resendContact] = useResendContactMutation();

  const handleResendContact = useCallback(
    async (contact: Contact) => {
      const c = await resendContact(contact.id).unwrap();
      const updated = { ...contact, chat_id: c.chat_id, status: ContactStatus.PENDING };
      await saveContact(updated);
      dispatch(updateContact({ contactID: contact.id, changes: updated }));
    },
    [resendContact, dispatch],
  );

  return { handleResendContact };
};
