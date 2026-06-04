import { useAppSelector } from '@/app-root/store';
import CallIcon from '@/assets/icons/call';
import ChatIcon from '@/assets/icons/chats';
import CopyIcon from '@/assets/icons/copy';
import { ContactStatus, selectContactByID } from '@/entities/contact';
import { ChatActions } from '@/features/manage-chat';
import { ContactActions } from '@/features/manage-contact';
import { InviteActions } from '@/features/manage-contact-invite';
import { ROUTES } from '@/shared/config/routes';
import { COLORS } from '@/shared/config/theme';
import { share } from '@/shared/lib/share';
import { BtnBack } from '@/shared/ui/buttons/BtnBack';
import { BtnIcon } from '@/shared/ui/buttons/BtnIcon';
import { Txt } from '@/shared/ui/texts/Txt';
import { ContainerScroll } from '@/shared/ui/views/ContainerScroll';
import { SafeView } from '@/shared/ui/views/SafeView';
import { Section } from '@/shared/ui/views/Section';
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { id: contactID } = useLocalSearchParams<{ id: string }>();
  const contact = useAppSelector((s) => selectContactByID(s, contactID));
  const isAccepted = contact?.status === ContactStatus.ACCEPTED;

  useEffect(() => {
    if (!contact) router.replace(ROUTES.HOME);
  }, [contact, router]);

  if (!contact) return;

  return (
    <SafeView style={{ paddingTop: 0 }}>
      <Section>
        <BtnBack />
        <ContainerScroll>
          <Txt color="textHeader" size="l" isBold>
            {contact.name}
          </Txt>
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginTop: 6,
            }}
          >
            {isAccepted && (
              <>
                <BtnIcon text={t('chat')} onPress={() => router.push(ROUTES.CHAT(contact.chatID))}>
                  <ChatIcon color={COLORS.textMain} />
                </BtnIcon>
                <BtnIcon text={t('call')} onPress={() => router.push(ROUTES.CALL.ROOM(contactID))}>
                  <CallIcon color={COLORS.textMain} />
                </BtnIcon>
              </>
            )}
            <BtnIcon text={t('copy')} onPress={() => share({ message: contactID })}>
              <CopyIcon color={COLORS.textMain} />
            </BtnIcon>
          </View>
          <ContactActions contactID={contactID} />
          <ChatActions contactID={contactID} />
          <InviteActions contactID={contactID} />
          <View style={{ height: 80 }} />
        </ContainerScroll>
      </Section>
    </SafeView>
  );
}
