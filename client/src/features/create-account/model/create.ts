import { store } from '@/app-root/store';
import { mapUserDtoToEntity, setUser } from '@/entities/User';
import { mapSessionDtoToEntity, setSession } from '@/entities/Session';
import { useCreateUserMutation } from '@/entities/User/api/user.api';
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
