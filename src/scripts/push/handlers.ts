import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { sendPush, sendPushToken } from './send';
import { ChatManager } from '../peer-to-peer/chat';
import { router } from 'expo-router';
import { updateStatusMessagesDB } from '../database/handlers/message/update-status';

export const registerForPushNotifications = async (userID: string) => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // if (!Constants.isDevice) {
  //   console.warn('Push notifications do not work in Expo Go on simulator');
  //   return;
  // }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Failed to get push token for push notification!');
    return;
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    })
  ).data;

  try {
    await sendPushToken(userID, token);
  } catch (err) {
    console.error(err);
  }
};

Notifications.setNotificationHandler({
  handleNotification: async (n) => {
    console.log(n);
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

// Notifications.addNotificationReceivedListener(async (notification) => {
//   const { type, ...payload } = notification.request.content.data || {};
//   switch (type) {
//     case 'new_message': {
//       try {
//         await ChatManager.initChat(payload.chatID);
//       } catch (err) {
//         console.error('Failed handle push new_message:', err);
//       }
//       break;
//     }

//     case 'status': {
//       try {
//         const { ids, status } = payload;
//         await updateStatusMessagesDB(ids, status);
//       } catch (err) {
//         console.error('Failed handle push status:', err);
//       }
//     }

//     default: {
//       console.log('Unregistered type notify:', type);
//     }
//   }
// });

// Notifications.addNotificationResponseReceivedListener((response) => {
//   const { type, ...payload } = response.notification.request.content.data || {};
//   switch (type) {
//     case 'new_message': {
//       console.log('CHAT ID:', payload.chatID);
//       router.push(`/chat/${payload.chatID}`);
//       break;
//     }

//     default: {
//       console.log('Unregistered type notify:', type);
//     }
//   }
// });
