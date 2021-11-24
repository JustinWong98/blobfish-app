import React from 'react'
import { Slider, Typography } from '@mui/material'
function BlobfishControls({
  setXAxis,
  setYAxis,
  setZAxis,
  setSize,
}) {
  return (
    <div>
      <Typography variant="h5">
      X-axis Scale
    </Typography>
      <Slider defaultValue={2.5} min={0.5} max={5} aria-label="x scale modifier" step={0.5} onChange={(e) => {setXAxis(e.target.value)}}/>
    <Typography variant="h5">
      Y-axis Scale
    </Typography>
    <Slider defaultValue={2.5} min={0.5} max={5} aria-label="y scale modifier" step={0.5} onChange={(e) => {setYAxis(e.target.value)}}/>
    <Typography variant="h5">
      Z-axis Scale
    </Typography>
    <Slider defaultValue={2.5} min={0.5} max={5} aria-label="z scale modifier" step={0.5} onChange={(e) => {setZAxis(e.target.value)}}/>
    <Typography variant="h5">
      Size Scale
    </Typography>
    <Slider defaultValue={1} step={0.1} min={0.5} max={2} aria-label="all scale modifier" onChange={(e) => {setSize(e.target.value)}}/>
    </div>
  )
}

export default BlobfishControls
