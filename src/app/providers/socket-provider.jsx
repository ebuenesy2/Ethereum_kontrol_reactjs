// src/app/providers/socket-provider.jsx
import { useEffect, useRef, useMemo } from 'react';
import { createSocket } from '../lib/socket';
import { useAuthStore } from '../store/auth.store';
import { SocketContext } from './socket-context';

export function SocketProvider({ children }) {
  const token = useAuthStore((s) => s.token);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      return;
    }

    const socket = createSocket(token);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🟢 Socket connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connect error:', err.message);
    });

    socket.connect();

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  const contextValue = useMemo(() => {
    return {
      getSocket: () => socketRef.current,
    };
  }, []);

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
}
