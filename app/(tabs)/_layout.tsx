import { Tabs } from 'expo-router';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { socket } from '@/lib/clients/socket';
import { Colors } from '@/assets/tokens';

import ChatIcon from '@/assets/icons/chat-icon';
import ContactsIcon from '@/assets/icons/contacts-icon';
import SettingsIcon from '@/assets/icons/settings-icon';

import Header from '@/components/header/Header';
import { connServerNotice } from '@/components/Notice';

export default function TabsLayout() {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    connServerNotice();
    socket.connect();
  }, []);

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
      <Tabs.Screen
        name="settings"
        options={{
          title: t('pages.settings'),
          header: () => <Header title={t('pages.settings')} />,
          tabBarIcon: ({ focused }) => tabIcon(SettingsIcon, focused),
        }}
      />
    </Tabs>
  );
}
