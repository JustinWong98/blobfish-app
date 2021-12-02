import { io } from 'socket.io-client';
import React from 'react';

export const BACKEND_URL = 'https://sleepy-plateau-69754.herokuapp.com/';

export const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling', 'flashsocket'],
  origins:'*:*'
  // rejectUnauthorized: false,
});
export const SocketContext = React.createContext();
//
// socket.on('connect_error', (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });
