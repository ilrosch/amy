import { createContext, useContext } from 'react';

interface SpinnerContextType {
  showLoader: () => void;
  hideLoader: () => void;
}

export const SpinnerContext = createContext<SpinnerContextType | null>(null);

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) throw new Error('useLoader must be used within SpinnerProvider');
  return context;
};
