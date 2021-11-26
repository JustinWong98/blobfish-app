import React, {useState} from 'react'
import AvatarMaker from './AvatarMaker'
import BlobfishControls from './BlobfishControls';
import CubeHeadControls from './CubeHeadControls';
import { Canvas, useFrame } from '@react-three/fiber';
import { Slider, Typography, MenuItem, InputLabel, FormControl, Select, Button, TextField } from '@mui/material'
import { CubeHead } from '../Avatars/CubeHead';
import { BACKEND_URL } from '../../BACKEND_URL';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function AvatarContainer() {
  const userId = document.cookie
  .split('; ')
  .find(row => row.startsWith('userId='))
  .split('=')[1]

   const navigate = useNavigate();
  // when they select an avatar, change all these to default values for that avatar
  // useReducer when refactoring
  const [xAxis, setXAxis] = useState(2.5)
  const [yAxis, setYAxis] = useState(2.5)
  const [zAxis, setZAxis] = useState(2.5)
  const [size, setSize] = useState(1)
  const [avatar, setAvatar] = useState('Blobfish')
  const [headHeight, setHeadHeight] = useState(2.5)
  const [headWidth, setHeadWidth] = useState(2)
  const [headLength, setHeadLength] = useState(2)
  const [earLength, setEarLength] = useState(2)
  const [headColor, setHeadColor] = useState('#808080')
  const [earColor, setEarColor] = useState('#ffff00')
  const [eyeColor, setEyeColor] = useState('#0000ff')
  const [name, setName] = useState('')


  const handleSubmit = () => {
    console.log(userId)
    let data = {}
    switch(avatar) {
      case "Blobfish":
        data = {
          model: 'Blobfish',
          name,
          userId,
          xAxis,
          yAxis,
          zAxis,
          size
        }
        break;
      case "CubeHead":
        data = {
          model: 'CubeHead',
          name,
          userId,
          headHeight,
          headWidth,
          headLength,
          earLength,
          headColor,
          earColor,
          eyeColor
        }
        break;
      default:
        return
    }

    axios.post(`${BACKEND_URL}/avatars`, data).then((result) => {
      console.log(result.data)
      if (result.data === 'success') {
         navigate('/dashboard');
      }
    })
  }
  return (
    <div>
      <div>
        <Typography variant="h3">
          Pick your Avatar
        </Typography>
        <TextField
          id=""
          label="Name"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Pick an Avatar</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={avatar}
          onChange={(e) => { setAvatar(e.target.value)}}
          autoWidth
          label="Avatar"
        >
          <MenuItem value='Blobfish'>
            Blobfish
          </MenuItem>
          <MenuItem value='CubeHead'>CubeHead</MenuItem>
        </Select>
      </FormControl>
      </div>
      <Canvas>
        <mesh>
          <AvatarMaker xAxis={xAxis} yAxis={yAxis} zAxis={zAxis} size={size} avatar={avatar} headHeight={headHeight} headWidth={headWidth} headLength={headLength} earLength={earLength} headColor={headColor} earColor={earColor} eyeColor={eyeColor}/>
        </mesh>
      </Canvas>
    {/* Make diff components for each*/}
    {avatar === 'Blobfish' && <BlobfishControls setXAxis={setXAxis} setYAxis={setYAxis} setZAxis={setZAxis} setSize={setSize}/>}
    {avatar === 'CubeHead' && <CubeHeadControls setHeadHeight={setHeadHeight} setHeadWidth={setHeadWidth} setHeadLength={setHeadLength} setEarLength={setEarLength} setHeadColor={setHeadColor} setEarColor={setEarColor} setEyeColor={setEyeColor}/>}
    <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit
    </Button>
    </div>
  )
}

export default AvatarContainer
