import axiosInstance from '@/src/lib/clients/axios';
import routes from '@/src/lib/routes';

type SendPush = (id: string, data: any) => Promise<void>;

export const sendPush: SendPush = async (id, data) => {
  try {
    await axiosInstance.post(routes.server.push(), {
      to: id,
      data,
      title: 'Title',
      body: 'Body',
      sound: 'default',
    });
  } catch (err) {
    console.error('Failed send push notification:', err);
    throw err;
  }
};

type SendPushToken = (id: string, token: string) => Promise<void>;

export const sendPushToken: SendPushToken = async (id, token) => {
  try {
    await axiosInstance.post(routes.server.pushToken(), { userID: id, expo_push_token: token });
  } catch (err) {
    console.error('Failed send push token:', err);
    throw err;
  }
};
