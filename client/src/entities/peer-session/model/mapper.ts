import { PeerEventPayload, SocketMessageDto } from '../config/types';

export const mapDtoToPayload = (dto: SocketMessageDto): PeerEventPayload => ({
  type: dto.type,
  peerID: dto.user_id,
  data: dto.payload,
});
