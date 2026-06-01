import { ChatHeader } from './ChatHeader';
import { Section } from '@/shared/ui/views/Section';
import { SendMessageForm } from '@/features/send-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector } from '@/app-root/store';
import { selectContactByChatID } from '@/entities/Contact';
import { MessageList } from '@/widgets/MessageList';
import { View } from 'react-native';
import { ROUTES } from '@/shared/config/routes';

export default function Chat() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { id: chatID } = useLocalSearchParams<{ id: string }>();
  const contact = useAppSelector((s) => selectContactByChatID(s, chatID));

  if (!chatID || !contact) {
    return router.replace(ROUTES.HOME);
  }

  return (
    <>
      <ChatHeader contactID={contact.id} />
      <View style={{ flex: 1, paddingBottom: bottom }}>
        <MessageList chatID={chatID} contactID={contact.id} />
        <SendMessageForm chatID={chatID} contactID={contact.id} />
      </View>
    </>
  );
}
