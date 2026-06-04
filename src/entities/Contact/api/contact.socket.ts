import { mapDtoToPayload } from '@/entities/peer-session/model/mapper';
import { saveContact } from './saveContact';
import { mapContactDtoToEntity, selectContactByID, setContact, updateContact } from '../model';
import { store } from '@/app-root/store';

export const contactSocketHandler = async (payload: any) => {
  const { type, data } = mapDtoToPayload(payload);

  switch (type) {
    case 'new_contact':
      const contact = mapContactDtoToEntity(data);
      const exists = selectContactByID(store.getState(), contact.id);
      await saveContact(contact);
      if (exists) {
        store.dispatch(
          updateContact({
            contactID: contact.id,
            changes: {
              status: contact.status,
              chatID: contact.chatID,
            },
          }),
        );
      } else {
        store.dispatch(setContact(contact));
      }
      break;
    case 'change_contact':
      const updatedContact = mapContactDtoToEntity(data);
      store.dispatch(
        updateContact({
          contactID: updatedContact.id,
          changes: { status: updatedContact.status },
        }),
      );
      const upsertContact = selectContactByID(store.getState(), updatedContact.id);
      await saveContact(upsertContact);
      break;
  }
};
