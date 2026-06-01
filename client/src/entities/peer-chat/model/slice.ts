import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Message } from '../config/types';
import { getMessages } from '../api/getMessages';

export const initMessages = createAsyncThunk(
  'entities/message/init',
  async ({ chatID, page, limit }: { chatID: string; page?: number; limit?: number }) => {
    return await getMessages(chatID, page, limit);
  },
);

const messageAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = messageAdapter.getInitialState({
  chatID: null as string | null,
});

export const messageSlice = createSlice({
  name: 'entities/message',
  initialState,
  reducers: {
    setChatID: (s, { payload }) => {
      s.chatID = payload;
    },
    setAllMessages: messageAdapter.setAll,
    setMessage: messageAdapter.addOne,
    setMessages: messageAdapter.addMany,
    updateMessage: messageAdapter.updateOne,
    delMessage: messageAdapter.removeMany,
    delAllMessages: messageAdapter.removeAll,
    cleanupMessages: (s) => {
      s.chatID = null;
      messageAdapter.removeAll(s);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initMessages.fulfilled, (s, { payload }) => {
      messageAdapter.setAll(s, payload);
    });
  },
});

export const { reducer: messageReducer } = messageSlice;
export const {
  setAllMessages,
  setMessage,
  setMessages,
  updateMessage,
  delMessage,
  delAllMessages,
  setChatID,
  cleanupMessages,
} = messageSlice.actions;
export { messageAdapter };
