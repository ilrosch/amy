import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

export interface UseFadeOut {
  duration?: number;
  delay?: number;
}

export const useFadeOut = ({ duration = 500, delay = 0 }: UseFadeOut) => {
  const opacity = useRef(new Animated.Value(1)).current;

  const handleFadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
  }, [delay, duration, opacity]);

  return {
    animFadeOutStyle: { opacity },
    handleFadeOut,
  };
};
