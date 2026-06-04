import { store, useAppDispatch } from '@/app-root/store';
import { deleteContact as dc, removeContact, selectContactByID } from '@/entities/contact';
import { useRejectContactMutation } from '@/features/manage-contact-invite';
import { useCallback } from 'react';

export const useDeleteContact = () => {
  const dispatch = useAppDispatch();
  const [rejectContact] = useRejectContactMutation();

  const handleDeleteContact = useCallback(
    async (contactID: string) => {
      try {
        await dc(contactID);
        await rejectContact(contactID);
        const { chatID } = selectContactByID(store.getState(), contactID);
        dispatch(removeContact({ contactID, chatID }));
      } catch (err) {
        console.error('failed to delete contact:', err);
      }
    },
    [dispatch, rejectContact],
  );

  return { handleDeleteContact };
};
