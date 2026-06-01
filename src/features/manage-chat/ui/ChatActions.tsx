import { useAppSelector } from '@/app-root/store';
import { ContactStatus, selectContactByID } from '@/entities/Contact';
import { BtnGroup, BtnGroupItem } from '@/shared/ui/buttons/BtnGroup';
import { useTranslation } from 'react-i18next';
import { useClearChat } from '../model/useClearChat';
import { useDeleteChat } from '../model/useDeleteChat';

export interface IChatActions {
  contactID: string;
}

export default function ChatActions({ contactID }: IChatActions) {
  const { t } = useTranslation('chatManage');
  const contact = useAppSelector((s) => selectContactByID(s, contactID));

  const { handleClearChat } = useClearChat(contact.chatID);
  const { handleDeleteChat } = useDeleteChat(contact.chatID);

  if (!contact) return;
  if (contact.status !== ContactStatus.ACCEPTED) return;

  const items: BtnGroupItem[] = [
    { text: t('actions.clear'), onPress: handleClearChat },
    { text: t('actions.delete'), onPress: handleDeleteChat },
  ];

  return (
    <BtnGroup text={t('title')} items={items} itemProps={{ btnProps: { variant: 'danger' } }} />
  );
}
