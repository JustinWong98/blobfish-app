import React, { useState } from 'react';
import { v1 as uuid } from 'uuid';
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import axios from 'axios';
import { PhoneDisabled } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { BACKEND_URL } from '../App.js';

function CreateRoom({ username }) {
  const [name, setName] = useState();
  const [cookies, setCookie] = useCookies(['userId']);
  let navigate = useNavigate();
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
        navigate(`/room/${id}`);
      })
      .catch((e) => {
        console.log('e in createRoom :>> ', e);
      });
  }
  console.log('cookies.userId :>> ', cookies.userId);
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mt: 2, mb: 2 },
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="body1" color="initial">
        Video chat room
      </Typography>
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
        startIcon={<PhoneDisabled fontSize="large" />}
        fullWidth
        onClick={create}
      >
        Create a Room
      </Button>
    </Box>
  );
}

export default CreateRoom;
