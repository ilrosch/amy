import { useAppDispatch, useAppSelector } from '@/app-root/store';
import { saveChat, selectChatsIDS, setChat } from '@/entities/Chat';
import { ROUTES } from '@/shared/config/routes';
import { ModalView } from '@/shared/ui/views/ModalView';
import { ContactList } from '@/widgets/ContactList';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function AddChat() {
  const { t } = useTranslation('addChatModal');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const existsIDS = useAppSelector(selectChatsIDS);

  const handleRouteChat = useCallback(
    async (chatID: string) => {
      console.log(chatID);

      if (!existsIDS.includes(chatID)) {
        await saveChat(chatID);
        dispatch(setChat({ chatID }));
      }

      router.replace(ROUTES.CHAT(chatID));
    },
    [dispatch, existsIDS, router],
  );

  return (
    <ModalView title={t('title')} text={t('text')}>
      <ContactList onPress={handleRouteChat} isScrollEnabled={false} param="chatID" />
    </ModalView>
  );
}
