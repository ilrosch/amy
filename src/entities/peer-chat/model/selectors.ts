import { RootState } from '@/app-root/store';
import { messageAdapter } from './slice';

const selectors = messageAdapter.getSelectors((s: RootState) => s.message);

export const selectMessages = selectors.selectAll;
