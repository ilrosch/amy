import { store } from '@/app-root/store';
import { mapUserDtoToEntity, setUser } from '@/entities/user';
import { mapSessionDtoToEntity, setSession } from '@/entities/session';
import { useCreateUserMutation } from '@/entities/user/api/user.api';
import { useCallback } from 'react';

export const useCreateUserAccount = () => {
  const [createAccount] = useCreateUserMutation();

  const handleCreateAccount = useCallback(
    async (name: string) => {
      try {
        const data = await createAccount({ name }).unwrap();
        if (!data) throw new Error('Empty response from server');
        const user = mapUserDtoToEntity(data.user);
        const session = mapSessionDtoToEntity(data.token);
        store.dispatch(setUser(user));
        store.dispatch(setSession(session));
      } catch (err) {
        throw err;
      }
    },
    [createAccount],
  );

  return { handleCreateAccount };
};
