import { Stack } from 'expo-router';

export function LayoutPublic() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'ios_from_right' }}>
      <Stack.Screen name="(sign-up)/index" />
      <Stack.Screen name="(sign-up)/sign-up" />
    </Stack>
  );
}
