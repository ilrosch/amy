import { Constraints } from 'react-native-webrtc/lib/typescript/getUserMedia';
import { RTCOfferOptions } from 'react-native-webrtc/lib/typescript/RTCUtil';

export const MEDIA_CONSTRAINTS = {
  audio: {
    mandatory: {
      echoCancellation: true,
      noiseSuppression: true,
    },
    echoCancellation: true,
    noiseSuppression: true,
  },
  video: {
    facingMode: 'user',
    frameRate: 30,
  },
} as Constraints;

export const SESSION_CONSTRAINTS = {
  iceRestart: true,
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
  voiceActivityDetection: true,
} as RTCOfferOptions;
