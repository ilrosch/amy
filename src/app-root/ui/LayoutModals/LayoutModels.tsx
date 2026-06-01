import { Stack } from 'expo-router';

export function LayoutModals() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
        presentation: 'transparentModal',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="add-chat" />
      <Stack.Screen name="add-contact" />
      <Stack.Screen name="[id]/rename" />
    </Stack>
  );
}
