import { RootState } from '@/app-root/store';

export const selectSession = (state: RootState) => state.session.data;
export const selectIsSessionInitialized = (state: RootState) => state.session.isInitialized;
