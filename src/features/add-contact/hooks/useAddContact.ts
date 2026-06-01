import { useCallback } from 'react';
import { useAppDispatch } from '@/app-root/store';
import { saveContact, setContact, useAddContactMutation } from '@/entities/Contact';
import { useValidateID } from './useValidateID';

export const useAddContact = () => {
  const dispatch = useAppDispatch();

  const { validateID } = useValidateID();
  const [addContact] = useAddContactMutation();

  const handleAddContact = useCallback(
    async (contactID: string) => {
      const errCode = validateID(contactID);
      if (errCode) return errCode;

      try {
        const contact = await addContact(contactID).unwrap();
        await saveContact(contact);
        dispatch(setContact(contact));
      } catch (err) {
        return err;
      }
    },
    [addContact, dispatch, validateID],
  );

  return { handleAddContact };
};
