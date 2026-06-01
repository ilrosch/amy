import { RootState } from '@/app-root/store';

export const selectUser = (state: RootState) => state.user.data;
export const selectUserID = (s: RootState) => s.user.data?.id;
export const selectIsUserInitialized = (state: RootState) => state.user.isInitialized;
