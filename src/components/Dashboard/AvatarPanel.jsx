import Button from '@mui/material/Button';
import { Typography, Container, Box, Grid, MenuItem } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AvatarJSONContext } from '../../App';

import SmartToyIcon from '@mui/icons-material/SmartToy';

import React, {useState, useEffect, useContext} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BACKEND_URL } from '../../BACKEND_URL';

const AvatarButton = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate('/avatar')
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<SmartToyIcon fontSize="large" />}
      fullWidth
      onClick={handleClick}
    >
      Create a new avatar
    </Button>
  );
};

const AvatarDropDown = ({ userId, avatarModel, setAvatar }) => {
  const {avatarJSON, setAvatarJSON } = useContext(AvatarJSONContext)
  const [userAvatar, setUserAvatar] = useState([])
  const [chosenAvatar, setChosenAvatar] = useState(0)
  useEffect(() => {
    axios.get(`${BACKEND_URL}/avatars/${userId}`, userId).then((results) => {
      setUserAvatar(results.data)
    })
  }, [])
  // setAvatarNames(results.data)
  // consider use context, use reducers for uploading and accessing avatar models

  const handleChange = (event) => {
    if (event.target.value > 0  ) {
      console.log(userId)
      const data = {
        userId: userId,
        avatarId: event.target.value
      }
      axios.post(`${BACKEND_URL}/displayAvatar`, data).then((result) => {
        console.log(result.data.specs)
        setAvatarJSON(result.data.specs)
      })
    }
    else {
      if (event.target.value === 'BlobfishDefault') {
      setAvatarJSON({
        model: event.target.value,
        xAxis:2.5,
            yAxis:2.5,
            zAxis:2.5,
            size:1
      })
      }
      else if (event.target.value === 'CubeHeadDefault') {
        setAvatarJSON({
        model: event.target.value,
        headHeight:2.5,
        headWidth:2.5,
        headLength:2.5,
        earLength:1,
        headColor:"#808080",
        earColor:"#ffff00",
        eyeColor:"#0000ff",
      })
      }
    }
    setChosenAvatar(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          variant="filled"
          id="demo-simple-select"
          value={chosenAvatar}
          label="Model"
          onChange={handleChange}
        >
          {userAvatar.map((avatar) => (
            <MenuItem value={avatar.id}>{avatar.name}</MenuItem>
          ))}
          <MenuItem value='BlobfishDefault'>Blobfish</MenuItem>
          <MenuItem value='CubeHeadDefault'>CubeHead</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

function AvatarPanel({ userId, avatarModel, setAvatar }) {
  console.log(`userId`, userId)
  return (
    <>
      <Typography variant="h5" color="initial">
        Avatars
      </Typography>
      <AvatarDropDown
        userId={userId}
        avatarModel={avatarModel}
        setAvatar={avatarModel}
      />
      <AvatarButton />
    </>
  );
}
export default AvatarPanel;
