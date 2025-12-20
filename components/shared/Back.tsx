import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/assets/tokens';
import BackIcon from '@/assets/icons/back-icon';

export type BackType = {
  style?: StyleProp<ViewStyle>;
  props?: PressableProps;
};

export default function Back({ style, ...props }: BackType) {
  const { bottom } = useSafeAreaInsets();

  return (
    <Pressable
      onPress={router.back}
      style={({ pressed }) => [styles.back, pressed && styles.backPressed, style, { bottom: bottom + 24 }]}
      {...props}
    >
      <BackIcon color={Colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.primary,
  },

  backPressed: {
    backgroundColor: Colors.primaryPressed,
  },
});
