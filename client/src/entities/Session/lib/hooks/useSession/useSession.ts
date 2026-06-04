import { useAppSelector } from '@/app-root/store/hooks';
import { selectSession } from '@/entities/session/model';

export const useSession = () => {
  const session = useAppSelector(selectSession);
  return { ...session, isAuthenticated: !!session?.accessToken };
};
