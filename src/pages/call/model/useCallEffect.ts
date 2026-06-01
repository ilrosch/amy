import { useEffect, useState } from 'react';

export interface IUseCallEffect {
  isLocalCameraEnabled: boolean;
  isRemoteCameraEnabled: boolean;
  handleLocalSpeaker: (enabled: boolean) => void;
  setIsLocalFullScreen: (enabled: boolean) => void;
}

export const useCallEffect = ({
  isLocalCameraEnabled,
  isRemoteCameraEnabled,
  handleLocalSpeaker,
  setIsLocalFullScreen,
}: IUseCallEffect) => {
  const [isFirstLocalCameraEnabled, setIsFirstLocalCameraEnabled] = useState<boolean>(true);
  const [isFirstRemoteCameraEnabled, setIsFirstRemoteCameraEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstLocalCameraEnabled && isLocalCameraEnabled) {
      setIsFirstLocalCameraEnabled(false);
      handleLocalSpeaker(true);
    }
  }, [isLocalCameraEnabled]);

  useEffect(() => {
    if (isFirstRemoteCameraEnabled && isRemoteCameraEnabled) {
      console.log('remote full screen');
      setIsFirstRemoteCameraEnabled(false);
      setIsLocalFullScreen(false);
      handleLocalSpeaker(true);
    }
  }, [isRemoteCameraEnabled]);

  useEffect(() => {
    return () => {
      setIsFirstLocalCameraEnabled(true);
      setIsFirstRemoteCameraEnabled(true);
    };
  }, []);
};
