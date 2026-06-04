import { useAppDispatch, useAppSelector } from '@/app-root/store';
import { saveChat, selectChatsIDS, setChat } from '@/entities/chat';
import { selectAllContacts } from '@/entities/contact';
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
  const contacts = useAppSelector(selectAllContacts);
  const existsIDS = useAppSelector(selectChatsIDS);

  const handleRouteChat = useCallback(
    async (chatID: string) => {
      if (!existsIDS.includes(chatID)) {
        await saveChat(chatID);
        const contactName = contacts.find((c) => c.chatID === chatID)?.name || '';
        dispatch(setChat({ id: chatID, contactName, lastMessage: null }));
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
