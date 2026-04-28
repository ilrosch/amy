import { useEffect, useRef } from 'react';
import { AnimationValue } from './@type/value';
import { Animated } from 'react-native';

export const useSlideUp = ({ value = 100, duration = 1000, delay = 300 }: AnimationValue = {}) => {
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
