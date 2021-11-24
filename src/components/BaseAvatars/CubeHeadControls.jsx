import React from 'react'
import { Slider, Typography } from '@mui/material'
import { SketchPicker, TwitterPicker } from 'react-color';

function CubeHeadControls({
  setHeadHeight,
  setHeadWidth,
  setHeadLength,
  setEarLength,
  setHeadColor,
  setEarColor,
  setEyeColor
}) {
  return (
    <div>
       <Typography variant="h5">
      Head Height
    </Typography>
      <Slider defaultValue={2} min={0.5} max={5} aria-label="x scale modifier" step={0.5} onChange={(e) => {setHeadHeight(e.target.value)}}/>
    <Typography variant="h5">
      Head Width
    </Typography>
    <Slider defaultValue={2.5} min={0.5} max={5} aria-label="y scale modifier" step={0.5} onChange={(e) => {setHeadWidth(e.target.value)}}/>
    <Typography variant="h5">
      Head Length
    </Typography>
    <Slider defaultValue={2} min={0.5} max={5} aria-label="z scale modifier" step={0.5} onChange={(e) => {setHeadLength(e.target.value)}}/>
    <Typography variant="h5">
      Ear Length
    </Typography>
    <Slider defaultValue={2} step={0.5} min={0.5} max={5} aria-label="all scale modifier" onChange={(e) => {setEarLength(e.target.value)}}/>
    <Typography variant="h5">
      Head Color
    </Typography>
    <TwitterPicker
        colors={['#808080', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
        onChange={(color) => {setHeadColor(color.hex)}}
      />
    <Typography variant="h5">
      Ear Color
    </Typography>
    <TwitterPicker
        colors={['#ffff00', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
        onChange={(color) => {setEarColor(color.hex)}}
      />
    <Typography variant="h5">
      Eye Color
    </Typography>
     <TwitterPicker
        colors={['#0000ff', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
        onChange={(color) => {setEyeColor(color.hex)}}
      />
    </div>
  )
}

export default CubeHeadControls
