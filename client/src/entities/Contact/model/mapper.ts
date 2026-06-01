import { Contact, ContactDTO } from './types';

export const mapContactDtoToEntity = (contactDTO: ContactDTO): Contact => ({
  id: contactDTO.id,
  name: contactDTO.name,
  status: contactDTO.status,
  chatID: contactDTO.chat_id,
});
