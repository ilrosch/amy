import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

export interface IUseSlide {
  hiddenValue?: number;
  duration?: number;
  delay?: number;
}

export const useSlide = ({ hiddenValue = 150, duration = 300, delay = 0 }: IUseSlide = {}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const valueRef = useRef(hiddenValue);
  valueRef.current = hiddenValue;

  const handleSlideOut = useCallback(() => {
    Animated.timing(translateY, {
      toValue: valueRef.current,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
  }, [delay, duration, translateY]);

  const handleSlideIn = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
  }, [delay, duration, translateY]);

  return {
    animSlideStyle: { transform: [{ translateY }] },
    handleSlideOut,
    handleSlideIn,
  };
};
