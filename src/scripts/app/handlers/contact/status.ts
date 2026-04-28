import http from '@/src/lib/clients/axios';
import { router } from '@/src/lib/routes';

export const statusContact = async (id: string): Promise<boolean> => {
  try {
    const response = await http.get(router.contact.status(id));
    const status = response.data?.status;
    if (status === 'online') return true;
    return false;
  } catch (err) {
    console.error('failed rejected contact:', err);
    return false;
  }
};
