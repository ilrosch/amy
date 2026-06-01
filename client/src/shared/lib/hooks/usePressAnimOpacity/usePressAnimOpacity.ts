import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

interface UsePressAnimOpacityProps {
  opacityTo?: number;
}

export const usePressAnimOpacity = ({ opacityTo = 0.7 }: UsePressAnimOpacityProps) => {
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(opacity, {
      toValue: opacityTo,
      useNativeDriver: true,
      speed: 30,
      bounciness: 0,
    }).start();
  }, [opacity, opacityTo]);

  const handlePressOut = useCallback(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  }, [opacity]);

  return {
    animOpacityStyle: {
      opacity,
    },
    pressHandlers: {
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
    },
  };
};
