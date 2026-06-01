import React, { useState, useMemo } from 'react';
import { SpinnerContext } from './context';
import { Spinner } from '@/shared/ui/blocks/Spinner';

export const SpinnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const value = useMemo(
    () => ({
      showLoader: () => {
        setLoading(true);
      },
      hideLoader: () => {
        setLoading(false);
      },
    }),
    [],
  );

  return (
    <SpinnerContext.Provider value={value}>
      {children}
      <Spinner visible={loading} />
    </SpinnerContext.Provider>
  );
};
