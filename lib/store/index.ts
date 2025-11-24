import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import contacts from "./slices/contacts";
import modals from "./slices/modals";

export const store = configureStore({
  reducer: {
    auth,
    contacts,
    modals,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
