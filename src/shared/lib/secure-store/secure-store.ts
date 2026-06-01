import * as Storage from 'expo-secure-store';

export const secureStore = {
  async get(key: string) {
    try {
      const value = await Storage.getItemAsync(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error('failed to get item from storage:', err);
      throw err;
    }
  },
  async set(key: string, value: any) {
    try {
      if (!value) return;
      const valueJSON = JSON.stringify(value);
      await Storage.setItemAsync(key, valueJSON);
    } catch (err) {
      console.error('failed to save item to storage:', err);
      throw err;
    }
  },
  async del(key: string) {
    try {
      await Storage.deleteItemAsync(key);
    } catch (err) {
      console.error('failed to delete item from storage:', err);
      throw err;
    }
  },
};
