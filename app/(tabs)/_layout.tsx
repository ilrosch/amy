import { Tabs } from 'expo-router';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { Colors } from '@/src/assets/tokens';

import ChatIcon from '@/src/assets/icons/chat-icon';
import ContactsIcon from '@/src/assets/icons/contacts-icon';
import SettingsIcon from '@/src/assets/icons/settings-icon';

import Header from '@/src/components/header/Header';
import NotifiesIcon from '@/src/assets/icons/notifies-icon';

import { showToast } from '@/src/scripts/toast';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectTokenData, selectUserID } from '@/src/lib/store/slices/user';
import { registerForPushNotifications } from '@/src/scripts/push/handlers';
import { refreshToken } from '@/src/scripts/app/handlers/user/refresh';
import { socket } from '@/src/lib/clients/socket';

export default function TabsLayout() {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const userID = useAppSelector(selectUserID);
  const tokenData = useAppSelector(selectTokenData);

  useEffect(() => {
    (async () => {
      // showToast({ type: 'info', text1: t('toast.connecting-server'), autoHide: false });
      refreshToken(tokenData);
      socket.connect();
      // await registerForPushNotifications(userID as string);
    })();
  }, [t, userID]);

  const tabIcon = (Icon: FC<SvgProps>, focused: boolean) => (
    <Icon color={focused ? Colors.primary : Colors.textDark} width={24} height={24} />
  );

  return (
    <Tabs
      safeAreaInsets={{ bottom: bottom + 10 }}
      screenOptions={{
        tabBarPosition: 'bottom',
        tabBarLabelStyle: { fontSize: 14, marginTop: 2 },
        tabBarAllowFontScaling: true,
        tabBarActiveTintColor: Colors.primary,
        animation: 'shift',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('pages.chats'),
          header: () => <Header title={t('pages.chats')} />,
          tabBarIcon: ({ focused }) => tabIcon(ChatIcon, focused),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: t('pages.contacts'),
          header: () => <Header title={t('pages.contacts')} />,
          tabBarIcon: ({ focused }) => tabIcon(ContactsIcon, focused),
        }}
      />
      {/* <Tabs.Screen
        name="notifications"
        options={{
          title: t('pages.notifications'),
          header: () => <Header title={t('pages.notifications')} />,
          tabBarIcon: ({ focused }) => tabIcon(NotifiesIcon, focused),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('pages.settings'),
          header: () => <Header title={t('pages.settings')} />,
          tabBarIcon: ({ focused }) => tabIcon(SettingsIcon, focused),
        }}
      /> */}
    </Tabs>
  );
}
