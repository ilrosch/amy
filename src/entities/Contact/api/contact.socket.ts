import { mapDtoToPayload } from '@/entities/peer-session/model/mapper';
import { updateContact } from './updateContact';
import { saveContact } from './saveContact';
import { contactSlice, mapContactDtoToEntity } from '../model';
import { store } from '@/app-root/store';

export const contactSocketHandler = async (payload: any) => {
  const { type, peerID, data } = mapDtoToPayload(payload);

  switch (type) {
    case 'new_contact':
      const contact = mapContactDtoToEntity(data);
      await saveContact(contact);
      store.dispatch(contactSlice.actions.setContact(contact));
      break;
    case 'change_contact':
      const updatedContact = mapContactDtoToEntity(data);
      store.dispatch(
        contactSlice.actions.updateContact({
          contactID: updatedContact.id,
          changes: { status: updatedContact.status },
        }),
      );
      await saveContact(updatedContact);
      break;
  }
};
