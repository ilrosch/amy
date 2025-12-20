import { Button, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/lib/store/hooks';
import { selectAllChats } from '@/lib/store/slices/chats';
import handleCopy, { handleCopyCurrentID } from '@/scripts/handleCopyID';

import AddChatIcon from '@/assets/icons/add-chat-icon';
import AddUserIcon from '@/assets/icons/add-user-icon';
import CopyIcon from '@/assets/icons/copy-icon';

import BtnActionIconBox from '@/components/action/BtnActionIconBox';
import ChatContactsList from '@/components/widgets/ChatContactsList';
import { router } from 'expo-router';

export default function Chats() {
  const { t } = useTranslation();
  const chats = useAppSelector(selectAllChats);

  return (
    <View style={styles.container}>
      <BtnActionIconBox
        btnData={[
          {
            Icon: AddChatIcon,
            title: t('actions.add-chat'),
            handle: () => router.push('new-chat'),
          },
          {
            Icon: AddUserIcon,
            title: t('actions.add-user'),
            handle: () => router.push('add-contact'),
          },
          {
            Icon: CopyIcon,
            title: t('actions.copy'),
            handle: handleCopyCurrentID,
          },
        ]}
      />
      <ChatContactsList items={chats} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1,
    gap: 6,
  },
});
