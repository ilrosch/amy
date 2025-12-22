import BackIcon from '@/assets/icons/back-icon';
import CloseIcon from '@/assets/icons/close-icon';
import { Colors } from '@/assets/tokens';
import Avatar from '@/components/shared/Avatar';
import SafeView from '@/components/shared/SafeView';
import ThemedText from '@/components/shared/ThemedText';
import { useAppSelector } from '@/lib/store/hooks';
import { selectContact } from '@/lib/store/slices/contacts';
import { useAudioPlayer } from 'expo-audio';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import ReceiveCallIcon from '@/assets/icons/receive-call-icon';
import { incomingCallNotify } from '@/lib/notify';

export default function CallReply() {
  const router = useRouter();
  const { t } = useTranslation();
  const { id: remoteID } = useLocalSearchParams<{ id: string }>();
  const { name: contactName } = useAppSelector((state) => selectContact(state, remoteID));
  const player = useAudioPlayer(require('@/assets/sounds/call-receive.mp3'));

  useEffect(() => {
    if (!contactName) return;
    incomingCallNotify(contactName);
  }, [contactName]);

  useEffect(() => {
    player.loop = true;
    player.play();
  }, [player]);

  return (
    <SafeView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={router.back} style={styles.back}>
          <BackIcon color={Colors.textDark} />
        </Pressable>
        <ThemedText style={styles.text}>{t('info.incoming-call')}</ThemedText>
      </View>
      <Avatar name={contactName} sizeText={'xl'} styleBox={styles.avatar} />
      <ThemedText title size={'l'} style={styles.title}>
        {contactName}
      </ThemedText>
      <View style={styles.btnBox}>
        <Pressable onPress={() => {}} style={({ pressed }) => [styles.btn, { backgroundColor: Colors.danger }]}>
          <CloseIcon color={Colors.white} />
        </Pressable>
        <Pressable
          onPress={() => {
            player.pause();
            router.replace({
              pathname: `call/${remoteID}`,
              params: { reply: 'true' },
            });
          }}
          style={({ pressed }) => [styles.btn, { backgroundColor: Colors.primary }]}
        >
          <ReceiveCallIcon color={Colors.white} />
        </Pressable>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 32,
    alignSelf: 'center',
  },
  title: {
    marginTop: 16,
    color: Colors.titleDark,
  },
  text: {
    flexGrow: 1,
    color: Colors.textDark,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: '-50%' }],
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    bottom: 32,
    gap: 16,
  },
  btn: {
    width: 66,
    height: 66,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
