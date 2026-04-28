import { AnimationValue } from './@type/value';
import { useFadeIn } from './use-fade-in';
import { useSlideUp } from './use-slide-up';

export const useFadeUp = ({ value = 100, duration = 1000, delay = 300 }: AnimationValue = {}) => {
  const opacity = useFadeIn({ duration, delay });
  const translateY = useSlideUp({ value, duration, delay });

  return { ...opacity, ...translateY };
};
