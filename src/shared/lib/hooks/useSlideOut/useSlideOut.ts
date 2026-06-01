import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

export interface UseSlideOut {
  value?: number;
  duration?: number;
  delay?: number;
}

export const useSlideOut = ({ value = 100, duration = 500, delay = 0 }: UseSlideOut) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const valueRef = useRef(value);
  valueRef.current = value;

  const handleSlideOut = useCallback(() => {
    Animated.timing(translateY, {
      toValue: valueRef.current,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
  }, [delay, duration, translateY]);

  return {
    animSlideOutStyle: { transform: [{ translateY }] },
    handleSlideOut,
  };
};
