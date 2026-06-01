import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export const useBack = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    return router.canGoBack() ? router.back() : router.replace('/');
  }, [router]);

  return handleBack;
};
