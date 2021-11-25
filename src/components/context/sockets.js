import { io } from 'socket.io-client';
import React from 'react';

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

export const socket = io(BACKEND_URL, {
  withCredentials: true,
  // rejectUnauthorized: false,
});
export const SocketContext = React.createContext();
//
// socket.on('connect_error', (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });
