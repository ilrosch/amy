import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Token, User } from '@/src/assets/entities/user';

interface UserState {
  user: User | null;
  token: Token | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setToken: (state, { payload }: PayloadAction<Token>) => {
      state.token = payload;
    },
    delUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, delUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserID = (state: RootState) => state.user.user?.id;
export const selectUserName = (state: RootState) => state.user.user?.name;

export const selectTokenData = (state: RootState) => state.user.token;
export const selectTokenString = (state: RootState) => state.user.token?.access_token;
export const selectTokenDate = (state: RootState) => state.user.token?.expires_at;

export default userSlice.reducer;
