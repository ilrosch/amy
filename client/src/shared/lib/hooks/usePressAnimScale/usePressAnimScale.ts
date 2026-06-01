import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

interface UsePressAnimScaleProps {
  scaleTo?: number;
}

export const usePressAnimScale = ({ scaleTo = 0.96 }: UsePressAnimScaleProps = {}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 30,
      bounciness: 0,
    }).start();
  }, [scale, scaleTo]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  }, [scale]);

  return {
    animScaleStyle: {
      transform: [{ scale }],
    },
    pressHandlers: {
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
    },
  };
};
