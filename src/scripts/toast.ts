import { Colors } from '@/src/assets/tokens';
import Toast, { ToastConfigParams } from 'react-native-toast-message';

export const showToast = (config: ToastConfigParams) => {
  return Toast.show({
    ...config,
    text1Style: { fontSize: 14, color: Colors.textDark },
  });
};
