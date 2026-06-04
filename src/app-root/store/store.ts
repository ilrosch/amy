import { configureStore } from '@reduxjs/toolkit';
import { userApi, userReducer } from '@/entities/user';
import { sessionReducer } from '@/entities/session';
import { chatReducer } from '@/entities/chat';
import { contactApi, contactReducer } from '@/entities/contact';
import { messageReducer } from '@/entities/peer-chat';

export const store = configureStore({
  reducer: {
    user: userReducer,
    session: sessionReducer,
    chat: chatReducer,
    contact: contactReducer,
    message: messageReducer,

    [contactApi.reducerPath]: contactApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (gDM) => gDM().concat(contactApi.middleware, userApi.middleware),
});
