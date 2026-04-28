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

export const mediaConstraints: MediaStreamConstraints = {
  audio: {
    autoGainControl: true,
    echoCancellation: true,
    noiseSuppression: true,
  },
  video: {
    frameRate: { min: 15, ideal: 30, max: 60 },
    facingMode: 'user',
  },
};

export const sessionConstraints = {
  iceRestart: true,
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};
