import React, { useState, useContext } from 'react';
import { v1 as uuid } from 'uuid';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { RoomListContext } from './RoomRepo.jsx';
import { BACKEND_URL } from '../App.js';
import { addRoom } from './roomsListReducer.js';

function RoomForm({ username }) {
  const [name, setName] = useState();
  const [cookies, setCookie] = useCookies(['userId', 'username']);
  let navigate = useNavigate();

  const dispatch = useContext(RoomListContext);

  function create(e) {
    e.preventDefault();
    if (name === '') {
      return;
    }
    const id = uuid();
    //axios post create room
    axios
      .post(`${BACKEND_URL}/rooms`, { userId: cookies.userId, uuid: id, name })
      .then((response) => {
        console.log('response.data from create a room :>> ', response.data);
        // navigate(`/room/${id}`);
        dispatch(
          addRoom({ ...response.data.room, username: cookies.username })
        );
        setName('');
      })
      .catch((e) => {
        console.log('e in createRoom :>> ', e);
      });
  }
  console.log('cookies.userId :>> ', cookies.userId);
  return (
    <div>
      <TextField
        id="Room name"
        label="Room name"
        value={name}
        variant="filled"
        onChange={(e) => {
          setName(e.target.value);
        }}
        fullWidth
      />
      <Button
        variant="contained"
        color="secondary"
        startIcon={<VideoCameraFrontIcon fontSize="large" />}
        fullWidth
        onClick={create}
      >
        Create a Room
      </Button>
    </div>
  );
}

export default RoomForm;
