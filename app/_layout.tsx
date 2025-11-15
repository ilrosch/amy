import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import "@/i18n/";
import { store } from "@/store";
import { useEffect, useState } from "react";
import prepareData from "@/scripts/prepareData";
import { useAppSelector } from "@/store/hooks";
import { selectUserToken } from "@/store/slices/auth";

function LayoutContent() {
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
