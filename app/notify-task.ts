// import * as BackgroundTask from 'expo-background-task';
// import * as TaskManager from 'expo-task-manager';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import { Platform } from 'react-native';
// import Constants from 'expo-constants';

// Notifications.setNotificationHandler({
//   handleNotification: async (notification) => {
//     const { data } = notification.request.content;

//     // Если есть данные для кастомного уведомления — скрываем системное
//     if (data?.messageText) {
//       return {
//         shouldShowBanner: false, // 👈 Скрываем системный баннер
//         shouldShowList: false,
//         shouldPlaySound: false,
//         shouldSetBadge: true, // Бейдж можно оставить
//       };
//     }

//     // Иначе показываем как есть
//     return {
//       shouldShowBanner: true,
//       shouldShowList: true,
//       shouldPlaySound: true,
//       shouldSetBadge: true,
//     };
//   },
// });

// export const setupForegroundHandler = () => {
//   return Notifications.addNotificationReceivedListener((notification) => {
//     const { data } = notification.request.content;

//     Notifications.scheduleNotificationAsync({
//       content: {
//         title: data.senderName || 'Новое сообщение',
//         body: data.messageText,
//         data: data,
//       },
//       trigger: null, // Показать немедленно
//     });
//   });
// };

// export const setupResponseHandler = (navigation: any) => {
//   return Notifications.addNotificationResponseReceivedListener((response) => {
//     const { data } = response.notification.request.content;

//     // Если приложение открылось по тапу, но системное уведомление было "пустым" —
//     // можно показать корректное локальное уведомление (опционально)
//     if (
//       data?.messageText &&
//       !response.notification.request.content.body?.includes(data.messageText)
//     ) {
//       Notifications.scheduleNotificationAsync({
//         content: {
//           title: data.senderName || 'Новое сообщение',
//           body: data.messageText,
//           data: data,
//         },
//         trigger: null,
//       });
//     }

//     // Навигация в чат
//     if (data?.chatId) {
//       navigation.navigate('Chat', { chatId: data.chatId });
//     }
//   });
// };

// // export const showNotification = (parsedData: any) => {
// //   if (!parsedData?.title) return;

// //   Notifications.scheduleNotificationAsync({
// //     content: {
// //       title: parsedData.title,
// //       body: parsedData.body || '', // Добавьте body, если он есть в JSON
// //       data: parsedData,
// //     },
// //     trigger: null,
// //   });
// // };

// // export const setupNotifyHandler = () => {
// //   return Notifications.addNotificationReceivedListener((notification) => {
// //     const { data } = notification.request.content;
// //     console.log('Foreground data:', data);
// //     // showNotification(data);
// //     // return;
// //   });
// // };

// // export const registerForPushNotificationsAsync = async () => {
// //   if (Platform.OS === 'android') {
// //     await Notifications.setNotificationChannelAsync('default', {
// //       name: 'default',
// //       importance: Notifications.AndroidImportance.MAX,
// //       vibrationPattern: [0, 250, 250, 250],
// //       lightColor: '#FF231F7C',
// //     });
// //   }

// //   if (Device.isDevice) {
// //     const { status } = await Notifications.getPermissionsAsync();

// //     let finalStatus = status;

// //     if (finalStatus !== 'granted') {
// //       const { status } = await Notifications.requestPermissionsAsync();
// //       finalStatus = status;
// //     }

// //     if (finalStatus !== 'granted') {
// //       console.error('Permission not granted to get push token for push notification!');
// //       return;
// //     }

// //     const projectId =
// //       Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
// //     if (!projectId) {
// //       console.error('Project ID not found!');
// //       return;
// //     }

// //     try {
// //       const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
// //       return pushToken;
// //     } catch (err) {
// //       console.error('failed to get push token:', err);
// //     }
// //   }
// // };

// // export const BACKGROUND_NOTIFICATION_TASK = 'background-notification-task';
// // // TaskManager.unregisterAllTasksAsync()
// // TaskManager.getRegisteredTasksAsync().then((t) => console.log(t));

// // TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async () => {
// //   console.log('ok');
// //   showNotification({ title: 'hello' });
// // });

// // const BACKGROUND_TASK_IDENTIFIER = 'background-task';

// // TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
// //   try {
// //     const now = Date.now();
// //     console.log(`Got background task call at date: ${new Date(now).toISOString()}`);
// //     showNotification({ title: 'hello' });
// //   } catch (error) {
// //     console.error('Failed to execute the background task:', error);
// //     return BackgroundTask.BackgroundTaskResult.Failed;
// //   }
// //   return BackgroundTask.BackgroundTaskResult.Success;
// // });

// // Notifications.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);

// // // export const registerBackgroundTask = async (): Promise<void> => {
// // //   try {
// // //     // await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
// // //     await Notifications.registerTaskAsync()
// // //     // await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
// // //     console.log('background notification task registered');
// // //   } catch (err) {
// // //     console.error('failed to register background task:', err);
// // //   }
// // // };
