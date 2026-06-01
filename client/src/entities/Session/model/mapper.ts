import type { Session, SessionDTO } from './types';

export const mapSessionDtoToEntity = (sessionDTO: SessionDTO): Session => ({
  accessToken: sessionDTO.access_token,
  expiresAt: sessionDTO.expires_at,
});
