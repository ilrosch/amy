import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import contacts from './slices/contacts';
import chats from './slices/chats';
import notices from './slices/notices';
import messages from './slices/messages';

export const store = configureStore({
  reducer: {
    user,
    contacts,
    chats,
    notices,
    messages,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
