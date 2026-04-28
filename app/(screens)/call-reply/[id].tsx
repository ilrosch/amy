import BackIcon from '@/src/assets/icons/back-icon';
import CloseIcon from '@/src/assets/icons/close-icon';
import { Colors } from '@/src/assets/tokens';
import Avatar from '@/src/components/shared/Avatar';
import SafeView from '@/src/components/shared/SafeView';
import ThemedText from '@/src/components/shared/ThemedText';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectContact } from '@/src/lib/store/slices/contacts';
import { useAudioPlayer } from 'expo-audio';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PermissionsAndroid, Pressable, StyleSheet, View } from 'react-native';
import ReceiveCallIcon from '@/src/assets/icons/call-icon';
// import CallManager from '@/src/scripts/app/peer/call';
import { callManager, signaling } from '@/src/scripts/app/peer/init';
import inCallManager from 'react-native-incall-manager';

// import { incomingCallNotify } from '@/src/lib/notify';
// import CallManager from '@/src/scripts/peer-to-peer/call';

// const options = {
//   ios: {
//     appName: 'Эми',
//   },
//   android: {
//     alertTitle: 'Permissions required',
//     alertDescription: 'This application needs to access your phone accounts',
//     cancelButton: 'Cancel',
//     okButton: 'ok',
//     imageName: 'phone_account_icon',
//     additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CALL_LOG],
//     // Required to get audio in background when using Android 11
//     foregroundService: {
//       channelId: 'com.ilrosch.amy',
//       channelName: 'Foreground service for my app',
//       notificationTitle: 'My app is running on background',
//       notificationIcon: 'Path to the resource icon of the notification',
//     },
//   },
// };

// RNCallKeep.setup(options).then((accepted) => {
//   console.log('Accepted:', accepted);
//   // RNCallKeep.displayIncomingCall(remoteID, '', contactName);
// });

// IncomingCall.display({
//   uuid: '123',
//   callerName: 'contact',
//   avatar: '',
//   callType: 'audio', // 'audio' | 'video'
//   backgroundColor: '#1A1A2E',
//   timeout: 20000, // auto-reject after 20 s
// });

export default function CallReply() {
  const router = useRouter();
  const { t } = useTranslation();
  const { id: remoteID } = useLocalSearchParams<{ id: string }>();
  const { name: contactName } = useAppSelector((state) => selectContact(state, remoteID));

  useEffect(() => {
    if (!contactName) return;
  }, [contactName]);

  useEffect(() => {
    // inCallManager.start({ media: 'video' });
    // inCallManager.startRingtone('_DEFAULT_', 10, 'playback', Infinity);
    // return () => {
    //   inCallManager.stopRingtone();
    //   inCallManager.stop();
    // };
    // (async () => {
    //   console.log('Ja')
    //   await IncomingCall.requestFullScreenPermission()
    //   await 
    // })();
  }, []);

  const handleExit = () => {
    callManager.close(remoteID);
    router.back();
  };

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
        <Pressable
          onPress={handleExit}
          style={({ pressed }) => [styles.btn, { backgroundColor: Colors.danger }]}
        >
          <CloseIcon color={Colors.white} />
        </Pressable>
        <Pressable
          onPress={() => {
            inCallManager.stopRingtone();
            inCallManager.stop();
            signaling.sendStatusCall(remoteID, 'accepted_call');
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
