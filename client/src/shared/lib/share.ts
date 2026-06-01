import { Share, ShareContent, ShareOptions } from 'react-native';

export const share = async (content: ShareContent, options?: ShareOptions) => {
  try {
    await Share.share(content, options);
  } catch (err) {
    console.error('failed to share:', err);
  }
};
