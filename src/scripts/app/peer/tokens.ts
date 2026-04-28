import { MediaTrackConstraints } from 'react-native-webrtc/lib/typescript/Constraints';
import { Constraints } from 'react-native-webrtc/lib/typescript/getUserMedia';

export const peerConnConfig = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302',
      ],
    },
  ],
};

export const mediaConstraints = {
  audio: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    googEchoCancellation: true,
    googAutoGainControl: true,
    googNoiseSuppression: true,
    googHighpassFilter: true,
    googTypingNoiseDetection: true,
    googNoiseReduction: true,
    volume: 1.0,
  },
  video: true,
  video: {
    mandatory: {
      minFrameRate: 30,
    },
    facingMode: 'user',
  },
};
export const sessionConstraints = {
  iceRestart: true,
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};
