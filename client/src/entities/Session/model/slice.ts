import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from './types';
import { getSessionFromStorage, setSessionToStorage } from '../api';

export const initSession = createAsyncThunk('entities/session/init', async () => {
  try {
    const session = await getSessionFromStorage();
    return session;
  } catch (e) {
    return null;
  }
});

interface SessionState {
  data: Session | null;
  isInitialized: boolean;
}

const initialState: SessionState = {
  data: null,
  isInitialized: false,
};

export const sessionSlice = createSlice({
  name: 'entities/session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.data = action.payload;
      setSessionToStorage(action.payload);
    },
    clearSession: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initSession.fulfilled, (s, { payload }) => {
        s.data = payload;
        s.isInitialized = true;
      })
      .addCase(initSession.rejected, (s) => {
        s.isInitialized = true;
      });
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export const { reducer: sessionReducer } = sessionSlice;
