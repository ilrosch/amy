import modalData from "@/lib/modalData";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ModalType = keyof typeof modalData;

interface ModalState {
  name: ModalType | null;
  open: boolean;
  props: Record<string, any>;
}

const initialState: ModalState = {
  name: null,
  open: false,
  props: {},
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ name: ModalType; props?: Record<string, any> }>,
    ) => {
      state.open = true;
      state.name = action.payload.name;
      state.props = action.payload.props || {};
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
