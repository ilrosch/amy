import { createEntityAdapter, createSlice, PayloadAction, Update } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { Message } from '@/src/assets/entities/message';

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
    updateMessagesStore: (state, action: PayloadAction<Update<Message, string>[]>) => {
      messagesAdapter.updateMany(state.messages, action.payload);
    },
    removeMessageStore: (state, action: PayloadAction<string>) => {
      messagesAdapter.removeOne(state.messages, action.payload);
    },
    prependMessages: (state, action: PayloadAction<Message[]>) => {
      const existingIds = new Set(state.messages.ids);
      const uniqueMessages = action.payload.filter((msg) => !existingIds.has(msg.id));

      if (uniqueMessages.length === 0) return;

      const newIds = uniqueMessages.map((m) => m.id);
      state.messages.ids = [...newIds, ...state.messages.ids];
      uniqueMessages.forEach((msg) => {
        state.messages.entities[msg.id] = msg;
      });
    },
    clearMessages: (state) => {
      state.chatID = null;
      messagesAdapter.removeAll(state.messages);
    },
  },
});

export const {
  addChatID,
  addMessageStore,
  prependMessages,
  addMessagesStore,
  updateMessageStore,
  updateMessagesStore,
  removeMessageStore,
  clearMessages,
} = messagesSlice.actions;

const messagesSelectors = messagesAdapter.getSelectors(
  (state: RootState) => state.messages.messages,
);

export const selectAllMessages = messagesSelectors.selectAll;
export const selectMessageById = messagesSelectors.selectById;

export default messagesSlice.reducer;
