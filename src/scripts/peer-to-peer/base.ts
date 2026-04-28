import { RTCIceCandidate, RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';
import SocketManager from '@/src/lib/clients/socket';

export type ChannelType = 'call' | 'chat';

export default class BaseP2P {
  // Create and send offer
  protected static async createOffer(
    conn: RTCPeerConnection,
    remoteID: string,
    channel: ChannelType,
    options?: RTCOfferOptions,
  ): Promise<void> {
    try {
      const offer = await conn.createOffer(options);
      await conn.setLocalDescription(offer);
      SocketManager.sendToAnother(remoteID, `offer_${channel}`, { offer });
    } catch (err) {
      console.error('Failed create offer:', err);
      throw err;
    }
  }

  // Create and send answer
  protected static async createAnswer(
    conn: RTCPeerConnection,
    remoteID: string,
    channel: ChannelType,
    sdp: RTCSessionDescription,
  ): Promise<void> {
    try {
      await this.setRemoteSDP(conn, sdp);
    } catch (err) {
      console.error('Failed set offer:', err);
      throw err;
    }

    try {
      const answer = await conn.createAnswer();
      await conn.setLocalDescription(answer);
      SocketManager.sendToAnother(remoteID, `answer_${channel}`, { answer });
    } catch (err) {
      console.error('Failed create answer:', err);
      throw err;
    }
  }

  // Set remote sdp
  protected static async setRemoteSDP(
    conn: RTCPeerConnection,
    sdp: RTCSessionDescription,
  ): Promise<void> {
    try {
      await conn.setRemoteDescription(sdp);
    } catch (err) {
      console.error('Failed set remote sdp:', err);
      throw err;
    }
  }

  // Set ice candidate
  protected static async addICECandidate(
    conn: RTCPeerConnection,
    candidate: RTCIceCandidate,
  ): Promise<void> {
    try {
      await conn.addIceCandidate(candidate);
    } catch (err) {
      console.error('Failed add ice candidate:', err);
    }
  }
}
