import { RootState } from '@/app-root/store';
import { contactAdapter } from './slice';
import { createSelector } from '@reduxjs/toolkit';

const selectors = contactAdapter.getSelectors((s: RootState) => s.contact);

export const selectAllContacts = selectors.selectAll;
export const selectContactByID = selectors.selectById;
export const selectContactsIDS = selectors.selectIds;
export const selectContactByChatID = createSelector(
  [selectAllContacts, (s: RootState, chatId: string) => chatId],
  (contacts, chatId) => contacts.find((contact) => contact.chatID === chatId),
);
