import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export const useRouterBack = () => {
  const router = useRouter();

  return useCallback(
    (to = '/') => {
      return router.canGoBack() ? router.back() : router.replace(to);
    },
    [router],
  );
};
