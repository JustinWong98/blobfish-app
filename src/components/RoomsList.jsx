import { useRef, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { BACKEND_URL } from '../App.js';

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Typography,
  Container,
  Box,
  Grid,
  Button,
  IconButton,
} from '@mui/material';

const RoomButton = ({ uuid }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard`);
    // navigate(`/room/${uuid}`);
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
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .delete(`${BACKEND_URL}/rooms/${roomId}`)
      .then((response) => {
        console.log('response from deleting room :>> ', response);
        navigate(`/dashboard`);
        //TODO GET WHOLE LIST TO RERENDER AFTER DELEING
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

function RoomList() {
  const [rooms, setRooms] = useState([]);
  //with realtime update for rooms ?
  //Socket new room created!
  //axios api request for new set of rooms
  //refresh button at the side to get new updates
  //ability to delete rooms when there are nobody inside or if room created by the user
  console.log('rooms :>> ', rooms);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/rooms`)
      .then((response) => {
        console.log('rooms :>> ', rooms);
        console.log('response.data  :>> ', response.data);
        setRooms(response.data.rooms);
      })
      .catch((e) => {
        console.log('error in getting rooms for room list', e);
      });
  }, []);

  console.log('rooms :>> ', rooms);
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
          <RoomRows rooms={rooms} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RoomList;

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
