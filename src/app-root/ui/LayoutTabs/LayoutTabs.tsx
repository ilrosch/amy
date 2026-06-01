import ChatIcon from '@/assets/icons/chats';
import ContactsIcon from '@/assets/icons/contacts';
import SettingsIcon from '@/assets/icons/settings';
import { COLORS } from '@/shared/config/theme';
import { Header } from '@/shared/ui/views/Header';
import { Tabs } from 'expo-router';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

export default function LayoutTabs() {
  const { t } = useTranslation('pages');
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMain,
        tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
        tabBarStyle: {
          height: 60 + bottom,
          paddingBottom: bottom > 0 ? bottom : 10,
          paddingTop: 6,
        },
        header: ({ options }) => <Header text={options.title ?? ''} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('chats'),
          tabBarIcon: ({ color }) => <ChatIcon width={24} height={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: t('contacts'),
          tabBarIcon: ({ color }) => <ContactsIcon width={24} height={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color }) => <SettingsIcon width={24} height={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
