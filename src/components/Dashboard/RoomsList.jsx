import React, { useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { BACKEND_URL } from '../../App.js';

import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

import { RoomListContext } from './RoomRepo.jsx';
import { deleteRoom, setRoom } from './roomsListReducer.js';

import { Button, IconButton } from '@mui/material';

const RoomButton = ({ uuid }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard`);
    navigate(`/room/${uuid}`);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      onClick={handleClick}
    >
      Join
    </Button>
  );
};

const DeleteButton = ({ roomId }) => {
  const navigate = useNavigate();
  console.log('roomId :>> ', roomId);

  const dispatch = useContext(RoomListContext);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .delete(`${BACKEND_URL}/rooms/${roomId}`)
      .then((response) => {
        console.log('response from deleting room :>> ', response);
        dispatch(deleteRoom(roomId));
      })
      .catch((e) => {
        console.log('e from deleting room :>> ', e);
      });
  };

  return (
    <IconButton aria-label="delete" onClick={handleClick}>
      <DeleteIcon color="secondary" fontSize="medium" />
    </IconButton>
  );
};
const RoomRows = ({ rooms }) => {
  console.log('runng in roomrows');
  const [cookies] = useCookies(['username']);

  console.log('rooms :>> ', rooms);
  const rows = rooms.map((row) => (
    <TableRow
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="center">{row.username}</TableCell>
      <TableCell align="center">{<RoomButton uuid={row.uuid} />}</TableCell>
      <TableCell align="right">
        {cookies.username === row.username && <DeleteButton roomId={row.id} />}
      </TableCell>
    </TableRow>
  ));

  return rows;
};

function RoomList({ roomsList }) {
  //with realtime update for rooms ?
  //Socket new room created!
  //axios api request for new set of rooms
  //refresh button at the side to get new updates
  //ability to delete rooms when there are nobody inside or if room created by the user
  const dispatch = useContext(RoomListContext);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/rooms`)
      .then((response) => {
        // console.log('rooms :>> ', rooms);
        console.log('response.data  :>> ', response.data.rooms);
        // setRooms(response.data.rooms);
        dispatch(setRoom(response.data.rooms));
      })
      .catch((e) => {
        console.log('error in getting rooms for room list', e);
      });
  }, []);
  console.log('running in roomList');
  // console.log('rooms :>> ', rooms);
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Creator</TableCell>
            <TableCell align="center">Join</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RoomRows rooms={roomsList} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RoomList;
