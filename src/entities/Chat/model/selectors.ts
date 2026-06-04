import { RootState } from '@/app-root/store';
import { chatAdapter } from './slice';

const selectors = chatAdapter.getSelectors((s: RootState) => s.chat);

export const selectAllChats = selectors.selectAll;
export const selectChatByID = selectors.selectById;
export const selectChatsIDS = selectors.selectIds;
