import { featuresResources } from '@/app-root/i18n/registry';
import { useAppDispatch, useAppSelector } from '@/app-root/store';
import { initChats } from '@/entities/Chat';
import { initContacts } from '@/entities/Contact';
import { initSession, selectIsSessionInitialized } from '@/entities/Session';
import { initUser, selectIsUserInitialized } from '@/entities/User';
import { getDB } from '@/shared/api/db';
import { registerFeatureResources } from '@/shared/config/i18n';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.setOptions({ duration: 1000, fade: true });
SplashScreen.preventAutoHideAsync();

registerFeatureResources(featuresResources);

export function InitProvider({ children }: { children: React.ReactNode }) {
  const [isReadyApp, setIsReadyApp] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const isSessionInit = useAppSelector(selectIsSessionInitialized);
  const isUserInit = useAppSelector(selectIsUserInitialized);

  useEffect(() => {
    dispatch(initSession());
    dispatch(initUser());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await getDB();
    })().then(() => {
      dispatch(initContacts());
      dispatch(initChats());
    });
  }, [dispatch]);

  useEffect(() => {
    if (isSessionInit && isUserInit) {
      setIsReadyApp(true);
      SplashScreen.hideAsync();
    }
  }, [isSessionInit, isUserInit]);

  if (!isReadyApp) return null;

  return children;
}
