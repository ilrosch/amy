import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppSelector } from '@/src/lib/store/hooks';
import { selectUserID } from '@/src/lib/store/slices/user';

import Container from '@/src/components/shared/Container';
import ChatForm from '@/src/components/widgets/ChatForm';
import Header from '@/src/components/widgets/chat/Header';
import MessageList from '@/src/components/widgets/chat/MessageList';
import { selectContactByChatID } from '@/src/lib/store/slices/contacts';
import {
  Contact,
  ContactStatus,
  StatusAccepted,
  StatusNew,
  StatusPending,
  StatusRejected,
} from '@/src/assets/entities/contact';
import InfoBadge from '@/src/components/shared/InfoBadge';
import { useTranslation } from 'react-i18next';
import BtnGroup from '@/src/components/action/BtnGroup';
import { useCallback } from 'react';
import { acceptContact } from '@/src/scripts/app/handlers/contact/accept';
import { rejectContact } from '@/src/scripts/app/handlers/contact/reject';

export default function Chat() {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const currentID = useAppSelector(selectUserID) as string;
  const { id: chatID } = useLocalSearchParams<{ id: string }>();

  const { id: peerID, status } = useAppSelector((s) => selectContactByChatID(s, chatID));

  const handleAccept = useCallback(() => acceptContact(peerID), [peerID]);
  const handleReject = useCallback(() => rejectContact(peerID), [peerID]);

  return (
    <>
      <Header remoteID={peerID} />
      <Container style={{ paddingBottom: bottom }}>
        <MessageList currentID={currentID} peerID={peerID} chatID={chatID} />
        {status === ContactStatus.Pending && <InfoBadge name={t('info.invite_pending')} />}
        {status === ContactStatus.Rejected && <InfoBadge name={t('info.invite_rejected')} />}
        {status === ContactStatus.New && (
          <BtnGroup
            name={t('settings.invite')}
            btns={[
              {
                title: t('actions.accept'),
                handle: handleAccept,
              },
              {
                type: 'danger',
                title: t('actions.reject'),
                handle: handleReject,
              },
            ]}
            style={{ box: { margin: 16 } }}
          />
        )}
        {status === ContactStatus.Accepted && (
          <ChatForm currentID={currentID} remoteID={peerID} chatID={chatID} />
        )}
      </Container>
    </>
  );
}
