import { useRef, useEffect, useState } from 'react';

import axios from 'axios';
import { BACKEND_URL } from '../App.js';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Container, Box, Grid } from '@mui/material';

const RoomRows = ({ rooms }) => {
  const rows = rooms.map((row) => (
    <TableRow
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.userId}</TableCell>
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
        setRooms(response.data.items);
      })
      .catch((e) => {
        console.log('error in getting rooms for room list', e);
      });
  }, []);

  console.log('rooms :>> ', rooms);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Creator</TableCell>
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
