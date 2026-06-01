import { useCallback } from 'react';

export const useDeleteUser = () => {
  const handleDeleteUser = useCallback(() => {}, []);
  return { handleDeleteUser };
};
