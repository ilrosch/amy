import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { updateContact } from './contacts';
import { addMessageStore } from './messages';

export type ChatType = { id: string; name: string; message: string | null };

const chatsAdapter = createEntityAdapter<ChatType>();

export const chatSlice = createSlice({
  name: 'chats',
  initialState: chatsAdapter.getInitialState(),
  reducers: {
    addChat: chatsAdapter.addOne,
    addChats: chatsAdapter.addMany,
    updateChat: chatsAdapter.updateOne,
    removeChat: chatsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(updateContact, (state, { payload }) => {
      chatsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    });
    builder.addCase(addMessageStore, (state, { payload }) => {
      chatsAdapter.updateOne(state, {
        id: payload.to_id,
        changes: {
          message: payload.body,
        },
      });
    });
  },
});

export const { addChat, addChats, updateChat, removeChat } = chatSlice.actions;

const chatSelectors = chatsAdapter.getSelectors((state: RootState) => state.chats);

export const selectAllChats = chatSelectors.selectAll;
export const selectChat = chatSelectors.selectById;

export default chatSlice.reducer;
