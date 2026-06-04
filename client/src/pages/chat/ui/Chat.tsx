import { ChatHeader } from './ChatHeader';
import { SendMessageForm } from '@/features/send-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector } from '@/app-root/store';
import { selectContactByChatID } from '@/entities/contact';
import { MessageList } from '@/widgets/MessageList';
import { View } from 'react-native';
import { ROUTES } from '@/shared/config/routes';
import { useEffect } from 'react';

export default function Chat() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { id: chatID } = useLocalSearchParams<{ id: string }>();
  const contact = useAppSelector((s) => selectContactByChatID(s, chatID));

  const exists = chatID && contact;

  useEffect(() => {
    if (!exists) router.replace(ROUTES.HOME);
  }, [exists, router]);

  if (!exists) return;

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
