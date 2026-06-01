import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export interface UseSlideUp {
  value?: number;
  duration?: number;
  delay?: number;
}

export const useSlideUp = ({ value = 100, duration = 1000, delay = 300 }: UseSlideUp) => {
  const translateY = useRef(new Animated.Value(value)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
  }, [delay, duration, translateY]);

  return { transform: [{ translateY }] };
};
