// import { useEffect, useState } from 'react';
// import * as Notifications from 'expo-notifications';
// import {
//   registerForPushNotificationsAsync,
//   sendPushNotification,
// } from '@/src/scripts/app/notify/notify';
// import { Button, Text, View } from 'react-native';
// import { useTranslation } from 'react-i18next';

// export default function Notify() {
//   const { t } = useTranslation();
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState<Notifications.Notification | undefined>(
//     undefined,
//   );
//   useEffect(() => {
//     registerForPushNotificationsAsync()
//       .then((token) => setExpoPushToken(token ?? ''))
//       .catch((error: any) => setExpoPushToken(`${error}`));
//   }, []);

//   // useEffect(() => {
//   //   const subscription = Notifications.addNotificationReceivedListener((notification) => {
//   //     const { title } = notification.request.content.data;

//   //     if (title) {
//   //       Notifications.scheduleNotificationAsync({
//   //         content: {
//   //           title: t(title),
//   //         },
//   //         trigger: null,
//   //       });
//   //     }
//   //   });

//   //   return () => subscription.remove();
//   // }, []);

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
//       <Text>Your Expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//       />
//     </View>
//   );
// }
