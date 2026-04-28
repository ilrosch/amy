import http from '@/src/lib/clients/axios';
import { i18nextInstance } from '@/src/lib/i18n';
import { router } from '@/src/lib/routes';
import {
  registerForPushNotificationsAsync,
  // setupNotificationCategories,
} from '@/src/scripts/app/notify/notify';
import * as storage from 'expo-secure-store';
import { useEffect } from 'react';

export const useNotification = () => {
  useEffect(() => {
    (async () => {
      try {
        // await setupNotificationCategories();
        const pushCredential = JSON.parse((await storage.getItemAsync('push_credential')) || '{}');
        const token = await registerForPushNotificationsAsync();
        if (!pushCredential || pushCredential.expo_token !== token) {
          const lang = i18nextInstance.language;
          await http.post(router.user.push(), {
            expo_token: token,
            user_lang: lang,
          });
          await storage.setItemAsync(
            'push_credential',
            JSON.stringify({ expo_token: token, user_lang: lang }),
          );
        }
      } catch (err) {
        console.error('failed notification:', err);
      }
    })();
  }, []);
};
