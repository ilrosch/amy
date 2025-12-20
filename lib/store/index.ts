import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import contacts from './slices/contacts';
import chats from './slices/chats';
import notices from './slices/notices';
import messages from './slices/messages';

export const store = configureStore({
  reducer: {
    auth,
    contacts,
    chats,
    notices,
    messages,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
