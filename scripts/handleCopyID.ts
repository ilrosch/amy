import { store } from '@/lib/store';
import * as Clipboard from 'expo-clipboard';

const handleCopy = (value?: string) => async () => {
  const { id } = store.getState().auth;
  await Clipboard.setStringAsync((value || id) ?? '');
  alert('Copy success!');
};

export default handleCopy;
