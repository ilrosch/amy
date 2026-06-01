import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  Contact,
  delAllContacts,
  removeContact,
  setContact,
  setContacts,
} from '@/entities/Contact';
import { Chat } from './types';
import { saveChat } from '../api/saveChat';
import { getAllChats } from '../api/getAllChats';
import { updateContact } from '@/entities/Contact/model';

export const initChats = createAsyncThunk('entities/chat/init', getAllChats);

const chatAdapter = createEntityAdapter<Chat>();

const initialState = chatAdapter.getInitialState();

export const chatSlice = createSlice({
  name: 'entities/chat',
  initialState,
  reducers: {
    setAllChats: chatAdapter.setAll,
    setChats: chatAdapter.addMany,
    setChat: chatAdapter.addOne,
    updateChat: chatAdapter.updateOne,
    delChat: chatAdapter.removeOne,
    delChats: chatAdapter.removeMany,
    delAllChats: chatAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(setContact, (s, { payload }) => {
      chatAdapter.addOne(s, {
        id: payload.chatID,
        contactName: payload.name,
        lastMessage: null,
      });

      saveChat(payload.chatID);
    });
    builder.addCase(setContacts, (s, { payload }) => {
      const contacts = payload as Contact[];
      const newChats: Chat[] = contacts.map((contact) => ({
        id: contact.chatID,
        contactName: contact.name,
        lastMessage: null,
      }));
      chatAdapter.addMany(s, newChats);
    });
    builder.addCase(updateContact, (s, { payload }) => {
      if (payload.chatId && payload.changes?.name) {
        chatAdapter.updateOne(s, {
          id: payload.chatId,
          changes: { contactName: payload.changes.name },
        });
      }
    });
    builder.addCase(removeContact, (s, { payload }) => {
      chatAdapter.removeOne(s, payload.chatID);
    });
    builder.addCase(delAllContacts, (s) => {
      chatAdapter.removeAll(s);
    });
    builder.addCase(initChats.fulfilled, (s, { payload }) => {
      chatAdapter.setAll(s, payload);
    });
  },
});

export const { reducer: chatReducer } = chatSlice;
export const { setAllChats, setChats, setChat, updateChat, delChat, delChats, delAllChats } =
  chatSlice.actions;
export { chatAdapter };
