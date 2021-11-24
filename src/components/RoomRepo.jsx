import { Typography, Container, Box, Grid } from '@mui/material';
import RoomForm from './RoomForm';
import RoomList from '../components/RoomsList';
import React, { useReducer } from 'react';

import { roomsReducer, initialState } from './roomsListReducer.js';

export const RoomListContext = React.createContext(null);

function RoomRepo({ username }) {
  const [roomsList, dispatch] = useReducer(roomsReducer, initialState);
  console.log('running in roomrepo');
  return (
    <>
      <RoomListContext.Provider value={dispatch}>
        <Typography variant="h5" color="initial">
          New room
        </Typography>
        <RoomForm username={username} />
        <Typography variant="h5" color="initial">
          Rooms
        </Typography>
        <RoomList username={username} roomsList={roomsList} />
      </RoomListContext.Provider>
    </>
  );
}

export default RoomRepo;
