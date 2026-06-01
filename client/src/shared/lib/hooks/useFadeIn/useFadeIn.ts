import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export interface UseFadeIn {
  duration?: number;
  delay?: number;
}

export const useFadeIn = ({ duration = 1000, delay = 300 }: UseFadeIn) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
  }, [delay, duration, opacity]);

  return { opacity };
};
