import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';
import { getUserFromStorage, saveUserToStorage } from '../api';

export const initUser = createAsyncThunk('entities/user/init', getUserFromStorage);

interface UserState {
  data: User | null;
  isInitialized: boolean;
}

const initialState: UserState = {
  data: null,
  isInitialized: false,
};

export const userSlice = createSlice({
  name: 'entities/user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      saveUserToStorage(action.payload);
    },
    updateUser: (state, action: PayloadAction<Omit<User, 'id' | 'createdAt'>>) => {
      if (!state.data) return;
      state.data.name = action.payload.name;
      state.data.updatedAt = action.payload.updatedAt;
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUser.fulfilled, (s, { payload }) => {
        s.data = payload;
        s.isInitialized = true;
      })
      .addCase(initUser.rejected, (s) => {
        s.isInitialized = true;
      });
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
