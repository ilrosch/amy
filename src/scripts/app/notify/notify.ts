import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// async function sendPushNotification(expoPushToken: string) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

function handleRegistrationError(errorMessage: string) {
  console.error('failed registration push', errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    // // 1. Получаем список всех созданных каналов
    // const channels = await Notifications.getNotificationChannelsAsync();

    // // 2. Проходим циклом и удаляем каждый по его ID
    // for (const channel of channels) {
    //   await Notifications.deleteNotificationChannelAsync(channel.id);
    // }

    // console.log(`Удалено каналов: ${channels.length}`);
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

// export async function setupNotificationCategories() {
//   await Notifications.setNotificationCategoryAsync('incoming-call-actions', [
//     {
//       identifier: 'accept',
//       buttonTitle: 'Принять',
//       options: { isDestructive: false, isAuthenticationRequired: false },
//     },
//     {
//       identifier: 'decline',
//       buttonTitle: 'Отклонить',
//       options: { isDestructive: true },
//     },
//   ]);

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: 'Входящий звонок',
//       body: 'Александр Иванов',
//       categoryIdentifier: 'incoming-call-actions', // Чтобы добавить кнопки "Принять/Отклонить"
//       priority: Notifications.AndroidNotificationPriority.MAX,
//       sticky: true, // Уведомление нельзя просто смахнуть
//     },
//     trigger: null, // Отправить немедленно
//   });
// }
