import { store, useAppDispatch } from '@/app-root/store';
import { deleteContact as dc, removeContact, selectContactByID } from '@/entities/Contact';
import { useRejectContactMutation } from '@/features/manage-contact-invite';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/shared/config/routes';

export const useDeleteContact = () => {
  const dispatch = useAppDispatch();
  const [rejectContact] = useRejectContactMutation();
  const router = useRouter();

  const handleDeleteContact = useCallback(
    async (contactID: string) => {
      try {
        await dc(contactID);
        await rejectContact(contactID);
        const { chatID } = selectContactByID(store.getState(), contactID);
        dispatch(removeContact({ contactID, chatID }));
        router.navigate(ROUTES.HOME);
      } catch (err) {
        console.error('failed to delete contact');
      }
    },
    [dispatch, rejectContact],
  );

  return { handleDeleteContact };
};
