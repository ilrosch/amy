import { mapSessionDtoToEntity, SessionDTO } from '@/entities/Session';
import { mapUserDtoToEntity, UserDTO } from '@/entities/User';
import { ENDPOINTS, http } from '@/shared/api/http';

type CreateUserResponse = {
  user: UserDTO;
  token: SessionDTO;
};

export const createAccount = async (name: string) => {
  try {
    const { data } = await http.post<CreateUserResponse>(ENDPOINTS.USER.CREATE, { name });
    if (!data) throw new Error('Empty response from server');
    return {
      user: mapUserDtoToEntity(data.user),
      session: mapSessionDtoToEntity(data.token),
    };
  } catch (err) {
    console.error('failed request to create account', err);
    throw err;
  }
};
