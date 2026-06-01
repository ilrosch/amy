import { useAppSelector } from '@/app-root/store';
import CallIcon from '@/assets/icons/call';
import ChatIcon from '@/assets/icons/chats';
import CopyIcon from '@/assets/icons/copy';
import { ContactStatus, selectContactByID } from '@/entities/Contact';
import { ChatActions } from '@/features/manage-chat';
import { ContactActions } from '@/features/manage-contact';
import { InviteActions } from '@/features/manage-contact-invite';
import { ROUTES } from '@/shared/config/routes';
import { COLORS } from '@/shared/config/theme';
import { share } from '@/shared/lib/share';
import { Avatar } from '@/shared/ui/blocks/Avatar/Avatar';
import { Btn } from '@/shared/ui/buttons/Btn';
import { BtnBack } from '@/shared/ui/buttons/BtnBack/BtnBack';
import { BtnGroup } from '@/shared/ui/buttons/BtnGroup';
import { BtnIcon } from '@/shared/ui/buttons/BtnIcon';
import { Txt } from '@/shared/ui/texts/Txt';
import { Container } from '@/shared/ui/views/Container';
import { ContainerScroll } from '@/shared/ui/views/ContainerScroll';
import { SafeView } from '@/shared/ui/views/SafeView';
import { Section } from '@/shared/ui/views/Section';
import { router } from 'expo-router';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import { View } from 'react-native';

export default function Profile() {
  const { id: contactID } = useLocalSearchParams<{ id: string }>();
  const contact = useAppSelector((s) => selectContactByID(s, contactID));
  const isAccepted = contact.status === ContactStatus.ACCEPTED;

  return (
    <SafeView style={{ paddingTop: 0 }}>
      <Section>
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
                <BtnIcon text="Chat">
                  <ChatIcon color={COLORS.textMain} />
                </BtnIcon>
                <BtnIcon text="Call" onPress={() => router.push(ROUTES.CALL.ROOM(contactID))}>
                  <CallIcon color={COLORS.textMain} />
                </BtnIcon>
              </>
            )}
            <BtnIcon text="Copy" onPress={() => share({ message: contactID })}>
              <CopyIcon color={COLORS.textMain} />
            </BtnIcon>
          </View>
          <ContactActions contactID={contactID} />
          <ChatActions contactID={contactID} />
          <InviteActions contactID={contactID} />
          <BtnBack />
        </ContainerScroll>
      </Section>
    </SafeView>
  );
}
