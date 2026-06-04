import { useAppSelector } from '@/app-root/store';
import BackIcon from '@/assets/icons/back';
import CallIcon from '@/assets/icons/call';
import { ContactStatus, selectContactByID } from '@/entities/contact';
import { ROUTES } from '@/shared/config/routes';
import { COLORS } from '@/shared/config/theme';
import { Txt } from '@/shared/ui/texts/Txt';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ChatHeader({ contactID }: { contactID: string }) {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const handleRouteProfile = useCallback(
    () => router.push(ROUTES.PROFILE(contactID)),
    [contactID, router],
  );

  const contact = useAppSelector((s) => selectContactByID(s, contactID));
  const isAccepted = contact.status === ContactStatus.ACCEPTED;

  return (
    <View style={[styles.box, { paddingTop: top + 12 }]}>
      <TouchableOpacity onPress={() => router.navigate(ROUTES.HOME)} activeOpacity={0.7}>
        <BackIcon color={COLORS.textMain} />
      </TouchableOpacity>

      <View style={styles.info}>
        <Txt
          isBold
          color="textHeader"
          onPress={handleRouteProfile}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {contact.name}
        </Txt>
      </View>
      <TouchableOpacity
        onPress={() => router.push(ROUTES.CALL.ROOM(contactID))}
        activeOpacity={0.7}
        disabled={!isAccepted}
      >
        <CallIcon color={!isAccepted ? COLORS.textSecondary : COLORS.textMain} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.borderSecondary,
    backgroundColor: COLORS.bgSecondary,
  },

  info: {
    flexShrink: 1,
  },
});
