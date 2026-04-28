import { ContactStatus } from '@/src/assets/entities/contact';
import BackIcon from '@/src/assets/icons/back-icon';
import CallSolidIcon from '@/src/assets/icons/call-solid-icon';
import { Colors } from '@/src/assets/tokens';
import ThemedText from '@/src/components/shared/ThemedText';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectContact } from '@/src/lib/store/slices/contacts';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type HeaderType = {
  remoteID: string;
};

export default function Header({ remoteID }: HeaderType) {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const { name: contactName, status } = useAppSelector((state) => selectContact(state, remoteID));

  const handleProfile = useCallback(() => router.push(`/profile/${remoteID}`), [remoteID, router]);
  const handleCall = useCallback(() => router.push(`/call/${remoteID}`), [remoteID, router]);

  return (
    <View style={[styles.box, { paddingTop: top + 12 }]}>
      <Pressable onPress={router.back} style={styles.iconBtn}>
        <BackIcon color={Colors.light} />
      </Pressable>
      <View style={styles.info}>
        <ThemedText
          onPress={handleProfile}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.infoTitle}
          title
        >
          {contactName}
        </ThemedText>
      </View>
      <View>
        <Pressable
          onPress={handleCall}
          style={styles.iconBtn}
          disabled={status !== ContactStatus.Accepted}
        >
          <CallSolidIcon color={Colors.light} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 44,
    backgroundColor: Colors.primary,
  },
  info: {
    flexShrink: 1,
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 12,
    backgroundColor: Colors.bgBadge,
  },
  infoTitle: {
    flexShrink: 1,
    textAlign: 'center',
    color: Colors.white,
  },
  iconBtn: {
    padding: 10,
    margin: -10,
  },
});
