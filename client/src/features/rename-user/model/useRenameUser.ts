import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app-root/store';
import { saveUserToStorage, selectUser, updateUser, User } from '@/entities/User';
import { useUpdateUserMutation } from '@/entities/User/api/user.api';
import { useBack } from '@/shared/lib/hooks/useBack';

export const useRenameUser = () => {
  const dispatch = useAppDispatch();
  const handleBack = useBack();
  const user = useAppSelector(selectUser) as User;
  const [updateUserServer] = useUpdateUserMutation();

  const handleRenameUser = useCallback(
    async (name: string) => {
      try {
        await updateUserServer({ name }).unwrap();
        const changed = { name, updatedAt: new Date().toISOString() };
        await saveUserToStorage({ ...user, ...changed });
        dispatch(updateUser(changed));
        handleBack();
      } catch (err) {}
    },
    [dispatch, handleBack, updateUserServer, user],
  );

  return { handleRenameUser };
};
