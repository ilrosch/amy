import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { updateContact } from './contacts';

export type ChatType = { id: string; name: string; message: string };

const chatsAdapter = createEntityAdapter<ChatType>();

export const chatSlice = createSlice({
  name: 'chats',
  initialState: chatsAdapter.getInitialState(),
  reducers: {
    addChat: chatsAdapter.addOne,
    addChats: chatsAdapter.addMany,
    updateChat: chatsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(updateContact, (state, { payload }) => {
      chatsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    });
  },
});

export const { addChat, addChats } = chatSlice.actions;

const chatSelectors = chatsAdapter.getSelectors((state: RootState) => state.chats);

export const selectAllChats = chatSelectors.selectAll;
export const selectChat = chatSelectors.selectById;

export default chatSlice.reducer;
