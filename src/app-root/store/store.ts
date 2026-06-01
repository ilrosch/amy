import { configureStore } from '@reduxjs/toolkit';
import { userApi, userReducer } from '@/entities/User';
import { sessionReducer } from '@/entities/Session';
import { chatReducer } from '@/entities/Chat';
import { contactApi, contactReducer } from '@/entities/Contact';
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
