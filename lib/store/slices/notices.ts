import noticeData from '@/lib/noticeData';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NoticeType = keyof typeof noticeData;

interface ModalState {
  name: NoticeType | null;
  open: boolean;
  props: Record<string, any>;
}

const initialState: ModalState = {
  name: null,
  open: false,
  props: {},
};

export const noticeSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    openNotice: (state, action: PayloadAction<{ name: NoticeType; props?: Record<string, any> }>) => {
      state.open = true;
      state.name = action.payload.name;
      state.props = action.payload.props || {};
    },
    closeNotice: () => initialState,
  },
});

export const { openNotice, closeNotice } = noticeSlice.actions;

export default noticeSlice.reducer;
