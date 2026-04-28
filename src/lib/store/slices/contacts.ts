import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { Contact } from '@/src/assets/entities/contact';

const contactsAdapter = createEntityAdapter<Contact>();

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState(),
  reducers: {
    addContactStore: contactsAdapter.addOne,
    addContactsStore: contactsAdapter.addMany,
    updateContactStore: contactsAdapter.updateOne,
    deleteContactStore: contactsAdapter.removeOne,
  },
});

export const { addContactStore, addContactsStore, updateContactStore, deleteContactStore } =
  contactSlice.actions;

const contactSelectors = contactsAdapter.getSelectors((state: RootState) => state.contacts);

export const selectAllContacts = contactSelectors.selectAll;
export const selectContact = contactSelectors.selectById;

export const selectContactByChatID = createSelector(
  [selectAllContacts, (state: RootState, chatId: string) => chatId],
  (contacts, chatId) => contacts.find((contact) => contact.chat_id === chatId),
);

export default contactSlice.reducer;
