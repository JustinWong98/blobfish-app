import React, {useContext, useRef, useState, useEffect} from 'react'
import {Grid, Typography, Paper} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from '../SocketContext.js'

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

function VideoPlayer() {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)
  const classes = useStyles()

  // const [peers, setPeers] = useState([]);
  // const socketRef = useRef();
  // const usersVideo = useRef();
  // const peersRef = useRef({});

  //    useEffect(() => {
  //       socketRef.current = io.connect("/");
  //       navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
  //           userVideo.current.srcObject = stream;
  //           socketRef.current.emit("join room", roomID);
  //           socketRef.current.on("all users", users => {
  //               const peers = [];
  //               users.forEach(userID => {
  //                   const peer = createPeer(userID, socketRef.current.id, stream);
  //                   peersRef.current.push({
  //                       peerID: userID,
  //                       peer,
  //                   })
  //                   peers.push(peer);
  //               })
  //               setPeers(peers);
  //           })

  //           socketRef.current.on("user joined", payload => {
  //               const peer = addPeer(payload.signal, payload.callerID, stream);
  //               peersRef.current.push({
  //                   peerID: payload.callerID,
  //                   peer,
  //               })

  //               setPeers(users => [...users, peer]);
  //           });

  //           socketRef.current.on("receiving returned signal", payload => {
  //               const item = peersRef.current.find(p => p.peerID === payload.id);
  //               item.peer.signal(payload.signal);
  //           });
  //       })
  //   }, []);

  return (
    <div>
      <Grid container className={classes.gridContainer}>
        {
          stream && (
            <Paper className={classes.paper} >
              <Typography variant = 'h5' gutterBottom>
                   {name || ''}
              </Typography>
              <Grid item xs={12} md={12}>
                  <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
              </Grid>
            </Paper>
          )
        }
        {
          callAccepted && !callEnded && (
            <Paper className={classes.paper} >
               <Typography variant = 'h5' gutterBottom>
                  {call.name || ''}
                </Typography>
              <Grid item xs={12} md={12}>
                  <video playsInline ref={userVideo} autoPlay className={classes.video}/>
              </Grid>
            </Paper>
          )
        }
      </Grid>
    </div>
  )
}

export default VideoPlayer
