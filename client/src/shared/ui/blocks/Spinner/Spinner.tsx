import { COLORS } from '@/shared/config/theme';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';

export type SpinnerType = {
  visible: boolean;
};

export function Spinner({ visible }: SpinnerType) {
  const [shouldRender, setShouldRender] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setShouldRender(false);
        }
      });
    }
  }, [visible, fadeAnim]);

  if (!shouldRender) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <View style={styles.box}>
        <ActivityIndicator color={COLORS.textMain} size="large" />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.bgOverlay,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  box: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
});
