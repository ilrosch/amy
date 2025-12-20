import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/lib/store/hooks';
import { selectAllContacts } from '@/lib/store/slices/contacts';

import ModalCustom from '@/components/modal/ModalCustom';
import ContactItemsList from '@/components/widgets/ContactItemsList';

export default function NewChatModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const contacts = useAppSelector(selectAllContacts);

  return (
    <ModalCustom title={t('modal.new-chat')} text={t('modal.new-chat-text')}>
      <ContactItemsList
        handler={router.dismiss}
        items={contacts}
        scroll={false}
        style={{
          contentBox: {
            paddingHorizontal: 0,
          },
        }}
      />
    </ModalCustom>
  );
}
