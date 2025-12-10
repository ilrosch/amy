import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { ContactType } from '@/scripts/database/handlers/add-contact-db';

const contactsAdapter = createEntityAdapter<ContactType>();

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState(),
  reducers: {
    addContact: contactsAdapter.addOne,
    addContacts: contactsAdapter.addMany,
    updateContact: contactsAdapter.updateOne,
    removeContact: contactsAdapter.removeOne,
  },
});

export const { addContact, addContacts, updateContact, removeContact } = contactSlice.actions;

const contactSelectors = contactsAdapter.getSelectors((state: RootState) => state.contacts);

export const selectAllContacts = contactSelectors.selectAll;
export const selectContact = contactSelectors.selectById;

export default contactSlice.reducer;
