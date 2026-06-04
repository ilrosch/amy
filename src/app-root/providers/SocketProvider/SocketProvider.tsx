import { socket } from '@/app-root/init/socket';
import { callHandler, callManager } from '../../init/call';
import { peerHandler, peerManager } from '../../init/peer-session';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useSession } from '@/entities/session';
import { SocketConfig } from '@/shared/api/socket';
import { chatManager } from '@/app-root/init/peer-chat';
import { contactSocketHandler } from '@/entities/contact/api/contact.socket';
import { chatSocketHandler } from '@/entities/peer-chat';

export const SocketContext = createContext({
  socket,
  peerManager,
  callManager,
  chatManager,
});

export const useSocket = () => useContext(SocketContext).socket;
export const useCallManager = () => useContext(SocketContext).callManager;
export const useChatManager = () => useContext(SocketContext).chatManager;

export function SocketProvider({ children }: { children: ReactNode }) {
  const { accessToken, isAuthenticated } = useSession();

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      socket.disconnect();
      return;
    }

    const config: SocketConfig = {
      token: accessToken,
      onMessage: (data: any) => {
        peerHandler(data);
        contactSocketHandler(data);
        chatSocketHandler(data);
        callHandler(data);
      },
      onClose: () => {
        console.log('connection close');
      },
      onOpen: () => {
        console.log('connection open');
      },
    };

    socket.connect(config);

    return () => {
      socket.disconnect();
    };
  }, [accessToken, isAuthenticated]);

  return (
    <SocketContext.Provider value={{ peerManager, callManager, chatManager, socket }}>
      {children}
    </SocketContext.Provider>
  );
}
