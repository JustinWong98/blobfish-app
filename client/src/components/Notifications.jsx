import React, { useContext } from 'react';
import { Button } from '@material-ui/core'
import { SocketContext } from '../SocketContext.js'

function Notifications() {
  const {answerCall, call, callAccepted } = useContext(SocketContext)
  console.log(call)
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{display:'flex', justifyContent: 'center'}}>
          <h1>{call.name} is calling: </h1>
          <Button variant='contained' color='primary' onClick={() => {answerCall()}}>
            Answer Call
          </Button>
        </div>
      )}
    </>
  )
}

export default Notifications
