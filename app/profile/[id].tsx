import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import handleCopy from '@/scripts/handleCopyID';
import { handleRouterChat } from '@/scripts/handlers/router-chat';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectContact } from '@/lib/store/slices/contacts';
import { openModal } from '@/lib/store/slices/modals';

import { Colors } from '@/assets/tokens';
import AddChatIcon from '@/assets/icons/add-chat-icon';
import CopyIcon from '@/assets/icons/copy-icon';
import CallIcon from '@/assets/icons/call-icon';

import Avatar from '@/components/shared/Avatar';
import ThemedText from '@/components/shared/ThemedText';
import Back from '@/components/shared/Back';
import BtnActionIconBox from '@/components/action/BtnActionIconBox';
import BtnActionTextBox from '@/components/action/BtnActionTextBox';

export default function Profile() {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const { id: currentID } = useLocalSearchParams<{ id: string }>();
  const { id: userID, name: userName } = useAppSelector((state) => selectContact(state, currentID));

  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <Avatar name={userName} sizeText={'l'} styleBox={styles.avatar} />
      <ThemedText size={'l'} title={true} style={styles.title}>
        {userName}
      </ThemedText>
      <BtnActionIconBox
        btnData={[
          {
            Icon: AddChatIcon,
            title: t('actions.chat'),
            handle: async () => handleRouterChat(currentID),
          },
          {
            Icon: CallIcon,
            title: t('actions.call'),
          },
          {
            Icon: CopyIcon,
            title: t('actions.copy'),
            handle: handleCopy(userID),
          },
        ]}
      />
      <BtnActionTextBox
        btnData={[
          {
            title: t('actions.rename'),
            handle: () =>
              dispatch(
                openModal({
                  name: 'rename-contact',
                  props: {
                    userID: userID,
                    valueField: userName,
                  },
                }),
              ),
          },
          {
            title: t('actions.clear-chat'),
            styleText: styles.btnDander,
            handle: () =>
              dispatch(
                openModal({
                  name: 'clear-chat-contact',
                  props: { userID: userID },
                }),
              ),
          },
          {
            title: t('actions.delete-contact'),
            styleText: styles.btnDander,
            handle: () =>
              dispatch(
                openModal({
                  name: 'remove-contact',
                  props: { userID: userID },
                }),
              ),
          },
        ]}
        styleBox={{ marginTop: 14, paddingBottom: bottom + 84 }}
      />
      <Back />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flex: 1,
    gap: 6,
  },
  box: {
    height: 66,
    backgroundColor: Colors.primary,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    marginHorizontal: -12,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: -66,
    alignSelf: 'center',
  },
  title: {
    marginTop: 16,
    marginBottom: 12,
    color: Colors.titleDark,
  },
  btnDander: {
    color: Colors.danger,
  },
});
