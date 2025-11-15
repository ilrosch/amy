import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface AuthState {
  id: string | null;
  token: string | null;
  name: string | null;
}

const initialState: AuthState = {
  id: null,
  token: null,
  name: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (
      state,
      { payload: { id, token, name } }: PayloadAction<AuthState>,
    ) => {
      state.id = id;
      state.token = token;
      state.name = name;
    },
    removeAuth: (state) => {
      state.id = null;
      state.token = null;
      state.name = null;
    },
  },
});

export const { addAuth, removeAuth } = counterSlice.actions;

export const selectUserID = (state: RootState) => state.auth.id;
export const selectUserToken = (state: RootState) => state.auth.token;
export const selectUserName = (state: RootState) => state.auth.name;

export default counterSlice.reducer;
