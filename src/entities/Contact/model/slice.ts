import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Contact } from './types';
import { getAllContact } from '../api/getAllContacts';

export const initContacts = createAsyncThunk('entities/contact/init', getAllContact);

export type UpdateContactPayload = {
  contactID: string;
  chatId?: string;
  changes: Partial<Contact>;
};

export type DelContactPayload = {
  contactID: string;
  chatID: string;
};

const contactAdapter = createEntityAdapter<Contact>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = contactAdapter.getInitialState();

export const contactSlice = createSlice({
  name: 'entities/contact',
  initialState,
  reducers: {
    setAllContacts: contactAdapter.setAll,
    setContact: contactAdapter.addOne,
    setContacts: contactAdapter.addMany,
    updateContact: (s, action: PayloadAction<UpdateContactPayload>) => {
      const { contactID: id, changes } = action.payload;
      contactAdapter.updateOne(s, { id, changes });
    },
    removeContact: (s, action: PayloadAction<DelContactPayload>) => {
      contactAdapter.removeOne(s, action.payload.contactID);
    },
    delContacts: contactAdapter.removeMany,
    delAllContacts: contactAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(initContacts.fulfilled, (s, { payload }) => {
      contactAdapter.setAll(s, payload);
    });
  },
});

export const { reducer: contactReducer } = contactSlice;
export const {
  setAllContacts,
  setContact,
  setContacts,
  updateContact,
  removeContact,
  delContacts,
  delAllContacts,
} = contactSlice.actions;
export { contactAdapter };
