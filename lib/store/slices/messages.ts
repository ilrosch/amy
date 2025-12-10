import { createEntityAdapter, createSlice, PayloadAction, Update } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Message } from '@/app/chat/[id]';

const messagesAdapter = createEntityAdapter<Message>({});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    chatID: null as string | null,
    messages: messagesAdapter.getInitialState(),
  },
  reducers: {
    addChatID: (state, action: PayloadAction<string>) => {
      state.chatID = action.payload;
    },
    addMessageStore: (state, action: PayloadAction<Message>) => {
      messagesAdapter.addOne(state.messages, action.payload);
    },
    addMessagesStore: (state, action: PayloadAction<Message[]>) => {
      messagesAdapter.addMany(state.messages, action.payload);
    },
    updateMessageStore: (state, action: PayloadAction<Update<Message, string>>) => {
      messagesAdapter.updateOne(state.messages, action.payload);
    },
    removeMessageStore: (state, action: PayloadAction<string>) => {
      messagesAdapter.removeOne(state.messages, action.payload);
    },
    clearMessages: (state) => {
      state.chatID = null;
      messagesAdapter.removeAll(state.messages);
    },
  },
});

export const { addChatID, addMessageStore, addMessagesStore, updateMessageStore, removeMessageStore, clearMessages } =
  messagesSlice.actions;

const messagesSelectors = messagesAdapter.getSelectors((state: RootState) => state.messages.messages);

export const selectAllMessages = messagesSelectors.selectAll;
export const selectMessageById = messagesSelectors.selectById;

export default messagesSlice.reducer;
