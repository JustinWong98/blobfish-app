import Button from '@mui/material/Button';
import { Typography, Container, Box, Grid, MenuItem } from '@mui/material';

import SmartToyIcon from '@mui/icons-material/SmartToy';

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AvatarButton = () => {
  const handleClick = (e) => {
    e.preventDefault();
    //Route to avatar creator
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
  // const [avatarName, setAvatarName]
  // get avatars by this person using axios get
  // get default avatars get from??
  // consider use context, use reducers for uploading and accessing avatar models

  const handleChange = (event) => {
    // find avatar in database according to value -> avatar id
    // setAvatar(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          variant="filled"
          id="demo-simple-select"
          value={avatarModel.name}
          label="Model"
          onChange={handleChange}
        >
          {/* To replace with user's models */}
          <MenuItem value={10}>{avatarModel.name}</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

function AvatarPanel({ userId, avatarModel, setAvatar }) {
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
