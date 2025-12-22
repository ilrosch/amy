import * as Notifications from 'expo-notifications';

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const incomingCallNotify = async (name: string) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Incoming call',
      body: `Contact ${name} calling`,
    },
    trigger: null,
  });
};
