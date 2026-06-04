import { confirmModal } from '@/shared/lib/modal/confirm';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteChatDB } from '../api';
import { showModal } from '@/shared/lib/modal/modal';
import { useAppDispatch } from '@/app-root/store';
import { delChat } from '@/entities/chat';

export const useDeleteChat = (chatID: string) => {
  const { t } = useTranslation('chatManage');
  const dispatch = useAppDispatch();

  const handleDeleteChat = useCallback(async () => {
    if (!chatID) return;

    try {
      const confirm = await confirmModal({
        title: t('modals.deleteConfirm.title'),
        message: t('modals.deleteConfirm.message'),
        confirm: t('modals.deleteConfirm.confirm'),
      });
      if (!confirm) return;

      await deleteChatDB(chatID);
      dispatch(delChat(chatID));
      await showModal({
        message: t('alerts.delete.success'),
      });
    } catch {
      await showModal({
        message: t('alerts.delete.error'),
      });
    }
  }, [chatID]);

  return { handleDeleteChat };
};
