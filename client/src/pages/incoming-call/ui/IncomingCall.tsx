import { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useCallManager } from '@/app-root/providers/SocketProvider/SocketProvider';
import { useAppSelector } from '@/app-root/store';
import { selectContactByID } from '@/entities/Contact';
import { ROUTES } from '@/shared/config/routes';
import { COLORS } from '@/shared/config/theme';
import { useBack } from '@/shared/lib/hooks/useBack';
import { Avatar } from '@/shared/ui/blocks/Avatar/Avatar';
import { Txt } from '@/shared/ui/texts/Txt';
import { Box } from '@/shared/ui/views/Box/Box';
import { Container } from '@/shared/ui/views/Container';
import { SafeView } from '@/shared/ui/views/SafeView';

import InitCallIcon from '@/assets/icons/init-call';
import { useAudioPlayer } from 'expo-audio';
import CallCancelIcon from '@/assets/icons/call-cancel';

export default function IncomingCall() {
  const router = useRouter();
  const { t } = useTranslation('call');
  const { id: contactID } = useLocalSearchParams<{ id: string }>();
  const contact = useAppSelector((s) => selectContactByID(s, contactID));

  const handleBack = useBack();
  const callManager = useCallManager();
  const player = useAudioPlayer('ringtone_incoming_call', { downloadFirst: true });

  const handleEnd = useCallback(() => {
    callManager.signaling.sendSignal(contactID, 'rejected_call');
    callManager.end(contactID);
    handleBack();
  }, [callManager, contactID, handleBack]);

  const handleInit = useCallback(() => {
    callManager.signaling.sendSignal(contactID, 'accepted_call');
    router.replace({
      pathname: ROUTES.CALL.ROOM(contactID),
      params: { reply: 'true' },
    });
  }, [callManager.signaling, contactID, router]);

  useEffect(() => {
    player.loop = true;
    player.play();
  }, []);

  return (
    <SafeView>
      <Container style={styles.container}>
        <Txt>{t('incoming-direction')}</Txt>
        <Avatar text={contact.name} textProps={{ size: 'l' }} style={styles.avatar} />
        <Txt color="textHeader" size="l" isBold>
          {contact.name}
        </Txt>
        <View style={styles.space} />
        <Box style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btn, styles.end]}
            onPress={handleEnd}
          >
            <CallCancelIcon color={COLORS.textContrast} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btn, styles.init]}
            onPress={handleInit}
          >
            <InitCallIcon color={COLORS.textContrast} />
          </TouchableOpacity>
        </Box>
      </Container>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  avatar: {
    width: 100,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  btn: {
    width: 60,
    aspectRatio: 1 / 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  init: {
    backgroundColor: COLORS.primary,
  },
  end: {
    backgroundColor: COLORS.danger,
  },
  space: {
    flex: 1,
  },
});
