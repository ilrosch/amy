import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { handleCopy } from '@/src/scripts/handleCopyID';
// import { handleRouterChat } from '@/src/scripts/handlers/router-chat';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectContact } from '@/src/lib/store/slices/contacts';

import { appStyles, Colors } from '@/src/assets/tokens';
import AddChatIcon from '@/src/assets/icons/add-chat-icon';
import CallIcon from '@/src/assets/icons/init-call-icon';

import Avatar from '@/src/components/shared/Avatar';
import ThemedText from '@/src/components/shared/ThemedText';
import Back from '@/src/components/widgets/Back';
import BtnActionIconBox from '@/src/components/action/BtnActionIconBox';

import Container from '@/src/components/shared/Container';
import BtnGroup from '@/src/components/action/BtnGroup';
import ContainerScroll from '@/src/components/shared/ContainerScroll';
import { acceptContact } from '@/src/scripts/app/handlers/contact/accept';
import {
  StatusAccepted,
  StatusNew,
  StatusPending,
  StatusRejected,
} from '@/src/assets/entities/contact';
import InviteActions from '@/src/components/widgets/InviteActions';
import { deleteContact } from '@/src/scripts/app/handlers/contact/delete';
import { rejectContact } from '@/src/scripts/app/handlers/contact/reject';
import InfoBadge from '@/src/components/shared/InfoBadge';
import { inviteContact } from '@/src/scripts/app/handlers/contact/add';
import { useCallback } from 'react';
import { clearChat } from '@/src/scripts/app/handlers/chat/clear';
import { deleteChat } from '@/src/scripts/app/handlers/chat/delete';

export default function Profile() {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const { id: currentID } = useLocalSearchParams<{ id: string }>();
  const {
    id: userID,
    name: userName,
    chat_id: chatID,
    status,
  } = useAppSelector((state) => selectContact(state, currentID));

  const success = useCallback(() => Alert.alert('Success'), []);

  const delContact = useCallback(() => {
    Alert.alert(t('contact.delete_title'), t('contact.delete_message'), [
      {
        text: t('app.btn_cancel'),
        style: 'cancel',
      },
      {
        text: t('app.btn_delete'),
        style: 'destructive',
        onPress: () => {
          deleteContact(currentID);
          router.replace('/');
        },
      },
    ]);
  }, [t, currentID, router]);

  const handleClearChat = useCallback(
    (chatID: string) => {
      Alert.alert(t('contact.delete_title'), t('contact.delete_message'), [
        {
          text: t('app.btn_cancel'),
          style: 'cancel',
        },
        {
          text: t('app.btn_delete'),
          style: 'destructive',
          onPress: () => {
            clearChat(chatID);
            success();
          },
        },
      ]);
    },
    [t],
  );

  const handleDeleteChat = useCallback(
    (chatID: string) => {
      Alert.alert(t('contact.delete_title'), t('contact.delete_message'), [
        {
          text: t('app.btn_cancel'),
          style: 'cancel',
        },
        {
          text: t('app.btn_delete'),
          style: 'destructive',
          onPress: () => {
            deleteChat(chatID);
            success();
          },
        },
      ]);
    },
    [t],
  );

  return (
    <Container style={{ overflow: 'visible', marginBottom: bottom }}>
      <ContainerScroll>
        <View style={styles.box}>
          <Avatar name={userName} sizeText="l" styleBox={styles.avatar} />
          <ThemedText title size={'l'} style={styles.title}>
            {userName}
          </ThemedText>
        </View>

        {status === StatusPending && <InfoBadge name={t('info.invite_pending')} />}
        {status === StatusRejected && (
          <>
            <InfoBadge name={t('info.invite_rejected')} style={{ box: { marginBottom: 16 } }} />
            <BtnGroup
              name={t('settings.invite')}
              btns={[
                {
                  title: t('actions.rename'),
                  handle: () => router.push(`/rename-contact/?id=${currentID}`),
                },
                {
                  title: t('actions.invite'),
                  handle: () => inviteContact(currentID),
                },
                {
                  type: 'danger',
                  title: t('actions.delete_contact'),
                  handle: delContact,
                },
              ]}
            />
          </>
        )}

        {status === StatusNew && (
          <>
            <InfoBadge name={t('info.invite_pending')} style={{ box: { marginBottom: 16 } }} />
            <BtnGroup
              name={t('settings.invite')}
              btns={[
                {
                  title: t('actions.accept'),
                  handle: () => acceptContact(currentID),
                },
                {
                  type: 'danger',
                  title: t('actions.reject'),
                  handle: () => rejectContact(currentID),
                },
              ]}
            />
            <BtnGroup
              name={t('settings.user')}
              btns={[
                {
                  title: t('actions.copy'),
                  // handle: () => handleCopy(userID),
                },
                {
                  title: t('actions.rename'),
                  handle: () => router.push(`/rename-contact/?id=${currentID}`),
                },
                {
                  type: 'danger',
                  title: t('actions.delete_contact'),
                  handle: delContact,
                },
              ]}
            />
          </>
        )}
        {status === StatusAccepted && (
          <>
            <BtnGroup
              name={t('settings.user')}
              btns={[
                {
                  title: t('call'),
                  handle: () => router.push(`/call/${currentID}`),
                },

                {
                  title: t('actions.copy'),
                  // handle: () => handleCopy(userID),
                },
                {
                  title: t('actions.rename'),
                  handle: () => router.push(`/rename-contact/?id=${currentID}`),
                },
                {
                  type: 'danger',
                  title: t('actions.reject'),
                  handle: () => rejectContact(currentID),
                },
                {
                  type: 'danger',
                  title: t('actions.delete_contact'),
                  handle: delContact,
                },
              ]}
            />
            <BtnGroup
              name={t('settings.chat')}
              btns={[
                {
                  type: 'danger',
                  title: t('actions.clear-chat'),
                  handle: () => handleClearChat(chatID),
                },
                {
                  type: 'danger',
                  title: t('actions.remove-chat'),
                  handle: () => handleDeleteChat(chatID),
                },
              ]}
            />
          </>
        )}
      </ContainerScroll>
      <Back />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 100,
    height: 100,

    alignSelf: 'center',
  },
  title: {
    marginTop: 16,
    marginBottom: 12,
    color: Colors.titleDark,
  },
  btnWarming: {
    color: Colors.danger,
  },

  btnDanger: {
    color: Colors.white,
    backgroundColor: Colors.danger,
  },
});
