import { Pressable, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppSelector } from '@/lib/store/hooks';
import { selectUserID } from '@/lib/store/slices/auth';
import { selectContact } from '@/lib/store/slices/contacts';

import { Colors } from '@/assets/tokens';
import BackIcon from '@/assets/icons/back-icon';
import CallIcon from '@/assets/icons/init-call-icon';

import ThemedText from '@/components/shared/ThemedText';
import MessagesList from '@/components/widgets/MessagesList';
import ChatForm from '@/components/widgets/ChatForm';

export default function Chat() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();

  const currentID = useAppSelector(selectUserID);
  const { id: remoteID } = useLocalSearchParams<{ id: string }>();
  const currentContact = useAppSelector((state) => selectContact(state, remoteID));

  return (
    <>
      <View style={[styles.header, { paddingTop: top + 24 }]}>
        <Pressable onPress={router.back}>
          <BackIcon color={Colors.white} />
        </Pressable>
        <Pressable onPress={() => router.push(`profile/${remoteID}`)} style={{ flexShrink: 1 }}>
          <ThemedText title={true} style={styles.headerTitle} numberOfLines={1} ellipsizeMode={'tail'}>
            {currentContact.name}
          </ThemedText>
        </Pressable>
        <Pressable onPress={() => router.push(`call/${remoteID}`)}>
          <CallIcon color={Colors.white} />
        </Pressable>
      </View>
      <View style={[styles.body, { paddingBottom: bottom + 12 }]}>
        <MessagesList currentID={currentID} remoteID={remoteID} />
        <ChatForm currentID={currentID} remoteID={remoteID} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerTitle: {
    flexShrink: 1,
    textAlign: 'left',
    alignSelf: 'center',
    color: Colors.white,
  },
});
