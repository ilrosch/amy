import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";

import chatsIcon from "@/assets/images/chat.png";
import contactIcon from "@/assets/images/contact.png";
import settingsIcon from "@/assets/images/settings.png";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const tabIcon = (source: any, focused: boolean) => (
    <Image
      source={source}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? "#86A788" : "#15151599",
      }}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: "#FFFFFF",
          shadowColor: "rgba(0, 0, 0, 0.05)",
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowRadius: 4,
          shadowOpacity: 1,
          paddingTop: 6,
          marginBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          position: "relative",
          fontSize: 14,
          fontWeight: "500",
          fontStyle: "normal",
          lineHeight: 20,
          letterSpacing: 0.1,
        },
        tabBarActiveTintColor: "#86A788",
        tabBarInactiveTintColor: "#15151599",
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          header: () => <Header title={t("pages.chats")} />,
          tabBarIcon: ({ focused }) => tabIcon(chatsIcon, focused),
          title: t("pages.chats"),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          header: () => <Header title={t("pages.contacts")} />,
          tabBarIcon: ({ focused }) => tabIcon(contactIcon, focused),
          title: t("pages.contacts"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          header: () => <Header title={t("pages.settings")} />,
          tabBarIcon: ({ focused }) => tabIcon(settingsIcon, focused),
          title: t("pages.settings"),
        }}
      />
    </Tabs>
  );
}
