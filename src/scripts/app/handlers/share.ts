import { Share, ShareContent } from 'react-native';

type ShareType = (content: ShareContent) => Promise<void>;

export const share: ShareType = async (content) => {
  try {
    await Share.share(content);
  } catch (err) {
    console.error('Failed share content:', err);
  }
};
