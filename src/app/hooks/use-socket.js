// apps/web/src/app/hooks/use-socket.js
import { useContext } from 'react';
import { SocketContext } from '../providers/socket-provider';

export function useSocket() {
  return useContext(SocketContext);
}
