import { User, UserDTO } from './types';

export const mapUserDtoToEntity = (userDTO: UserDTO): User => ({
  id: userDTO.id,
  name: userDTO.name,
  updatedAt: userDTO.updated_at,
  createdAt: userDTO.created_at,
});
