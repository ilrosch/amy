import { useRef } from 'react';
import { Animated } from 'react-native';

export const usePressBtn = ({ scaleTo = 0.95 }: { scaleTo?: number } = {}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return {
    animStyle: { transform: [{ scale }] },
    handlers: { onPressIn, onPressOut },
  };
};
