import { useEffect, useState } from 'react';

export const useCallEffects = ({ isRemoteCameraEnabled, setIsLocalFullScreen }) => {
  const [isFirstVideo, setIsFirstVideo] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstVideo && isRemoteCameraEnabled) {
      const handleAutoSpeaker = async () => {
        if (isFirstVideo && isRemoteCameraEnabled) {
          // await toggleSpeaker(true);
          setIsLocalFullScreen(false);
          setIsFirstVideo(false);
        }
      };
      handleAutoSpeaker();
    }
  }, [isRemoteCameraEnabled]);
};
