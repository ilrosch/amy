import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { AnimationTime } from './@type/time';

export const useFadeIn = ({ duration = 500, delay = 300 }: AnimationTime = {}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
  }, [opacity, duration, delay]);

  return { opacity };
};
