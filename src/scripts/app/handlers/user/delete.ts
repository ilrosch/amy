import { dropTables } from '@/src/scripts/database/handlers/drop';
import { deleteDataStore } from '@/src/scripts/prepareData';
import { router } from 'expo-router';

type DeleteUser = () => Promise<void>;

export const deleteUser: DeleteUser = async () => {
  try {
    await dropTables();
    await deleteDataStore();
    router.navigate('/');
  } catch (err) {
    console.error('Failed user delete:', err);
  }
};
