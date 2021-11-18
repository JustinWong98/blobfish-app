import React from 'react'
import {v1 as uuid} from 'uuid'
import { Button, TextField, Grid, Typography, Container, Paper} from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {PhoneDisabled } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom'
function CreateRoom() {
  let navigate = useNavigate()
  function create(){
    const id = uuid()
    navigate(`/room/${id}`)
  }
  return (
    <>
    <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize='large'/>} fullWidth onClick={create}>
         Create a Room
       </Button>
    </>
  )
}

export default CreateRoom
