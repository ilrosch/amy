import { useCallback } from 'react';
import { clearChatDB } from '../api/clearChat-db';
import { useTranslation } from 'react-i18next';
import { confirmModal } from '@/shared/lib/modal/confirm';
import { showModal } from '@/shared/lib/modal/modal';

export const useClearChat = (chatID: string) => {
  const { t } = useTranslation('chatManage');

  const handleClearChat = useCallback(async () => {
    if (!chatID) return;

    try {
      const confirm = await confirmModal({
        title: t('modals.clearConfirm.title'),
        message: t('modals.clearConfirm.message'),
        confirm: t('modals.clearConfirm.confirm'),
      });
      if (!confirm) return;

      await clearChatDB(chatID);
      await showModal({
        title: t('alerts.clear.success'),
        message: t('alerts.clear.success'),
      });
    } catch {
      await showModal({
        message: t('alerts.clear.error'),
      });
    }
  }, [chatID]);

  return { handleClearChat };
};
