import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import prepareData from "@/scripts/prepareData";
import { store } from "@/lib/store";
import { useAppSelector } from "@/lib/store/hooks";
import { selectUserToken } from "@/lib/store/slices/auth";
import "@/lib/i18n";

import HeaderSecondary from "@/components/header/HeaderSecondary";

function LayoutContent() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const token = useAppSelector(selectUserToken);

  useEffect(() => {
    prepareData().then(() => setLoading(true));
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="profile/[id]"
          options={{
            headerShown: true,
            header: () => <HeaderSecondary title={t("pages.profile")} />,
          }}
        />
      </Stack.Protected>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="rules" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <LayoutContent />
      </Provider>
      <StatusBar style="auto" />
    </>
  );
}
