import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Tabs } from "expo-router";
import { Image } from "react-native";

import Header from "@/components/Header";

import chatsIcon from "@/assets/images/chat.png";
import contactIcon from "@/assets/images/contact.png";
import settingsIcon from "@/assets/images/settings.png";
import NewContactModal from "@/components/modal/NewContactModal";
import SafeView from "@/components/SafeView";
import { createContext, useState } from "react";
import Loader from "@/components/Loader";

export const ModalContext = createContext({});

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

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
    <>
      <ModalContext.Provider value={{ showContactModal, setShowContactModal }}>
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
              title: t("pages.chats"),
              header: () => <Header title={t("pages.chats")} />,
              tabBarIcon: ({ focused }) => tabIcon(chatsIcon, focused),
            }}
          />
          <Tabs.Screen
            name="contacts"
            options={{
              title: t("pages.contacts"),
              header: () => <Header title={t("pages.contacts")} />,
              tabBarIcon: ({ focused }) => tabIcon(contactIcon, focused),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: t("pages.settings"),
              header: () => <Header title={t("pages.settings")} />,
              tabBarIcon: ({ focused }) => tabIcon(settingsIcon, focused),
            }}
          />
        </Tabs>
      </ModalContext.Provider>

      <NewContactModal
        visible={showContactModal}
        setVisible={setShowContactModal}
      />
    </>
  );
}
