import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { deleteContactStore, updateContactStore } from './contacts';
import { addMessageStore } from './messages';
import { ChatType } from '@/src/assets/entities/chat';

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
    builder.addCase(deleteContactStore, (state, { payload }) => {
      chatsAdapter.removeOne(state, payload);
    });
    builder.addCase(updateContactStore, (state, { payload }) => {
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
