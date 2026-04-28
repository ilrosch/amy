import axiosInstance from '@/src/lib/clients/axios';
import routes from '@/src/lib/routes';

export const isOnline = async (userID: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.get(routes.isOnline(userID));
    return res.data.status;
  } catch (err) {
    console.error('Failed get status user:', err);
    throw err;
  }
};
