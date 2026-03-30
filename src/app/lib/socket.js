// apps/web/src/app/lib/socket.js
import { io } from 'socket.io-client';
import { env } from '../config/env';

export function createSocket(token) {
  return io(env.API_URL, {
    autoConnect: false,
    auth: {
      token,
    },
  });
}
