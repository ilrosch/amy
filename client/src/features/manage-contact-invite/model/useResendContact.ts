import { useCallback } from 'react';
import { Contact, ContactStatus, saveContact } from '@/entities/Contact';
import { updateContact } from '@/entities/Contact/model/slice';
import { useAppDispatch } from '@/app-root/store';
import { useResendContactMutation } from '../api/contactStatusAPI';

export const useResendContact = () => {
  const dispatch = useAppDispatch();
  const [resendContact] = useResendContactMutation();

  const handleResendContact = useCallback(
    async (contact: Contact) => {
      await resendContact(contact.id).unwrap();
      const updated = { ...contact, status: ContactStatus.PENDING };
      await saveContact(updated);
      dispatch(updateContact({ contactID: contact.id, changes: updated }));
    },
    [resendContact, dispatch],
  );

  return { handleResendContact };
};
