import React, { useContext, useRef, useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useParams } from 'react-router-dom';

import { VideoFrame, OtherVideoFrame } from '../components/VideoElements';
const BACKEND_URL = 'http://localhost:3002';

const socket = io(BACKEND_URL, {
  withCredentials: true,
  // rejectUnauthorized: false,
});
socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}));

function Room({ username }) {
  const { roomID } = useParams();
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [peers, setPeers] = useState([]);
  // array of peers for people in room
  const peersRef = useRef([]);
  const stream = useRef();

  // use a ref to populate video iframe with the src of stream
  const myVideo = useRef();
  const myVideoModified = useRef();
  const userVideo = useRef();
  const threeCanvasRef = useRef();
  const connectionRef = useRef();
  const socketRef = useRef();
  const [videoIsSet, setVideo] = useState(false);

  socketRef.current = socket;

  console.log('threeCanvasRef :>> ', threeCanvasRef);
  useEffect(() => {
    console.log('use effect in videoPlayer');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = currentStream;
        //plays video in steam
        console.log('myVideo :>> ', myVideo);
        myVideo.current.srcObject = currentStream;
        socketRef.current.emit('joined room', roomID);
        setVideo(true);
        // person who joins connects to other peers
      })
      .then(() => {
        socketRef.current.on('get users', (users) => {
          const peers = [];
          users.forEach((userID) => {
            // for each user, create a peer and send in our id and stream
            const peer = createPeer(
              userID,
              socketRef.current.id,
              stream.current
            );
            // peersRef will handle collection of peers (all simple peer logic)
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            // setting state of array of peers for rendering purposes
            peers.push(peer);
          });
          setPeers(peers);
        });
        // on the receiver end, this fires when a new user joins
        socketRef.current.on('user joined', ({ signal, callerID }) => {
          console.log('callId in user joined:>> ', callerID);
          const peer = addPeer(signal, callerID, stream.current);
          peersRef.current.push({
            peerID: callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });
        // when handshake is complete - receiver gives back a signal
        socketRef.current.on('receiving returned signal', (data) => {
          // find peer that we are receiving from since we are going to receive multiple peers.
          // we loop through the list of peers and match the id of the one trying to signal us
          const item = peersRef.current.find((p) => p.peerID === data.id);
          item.peer.signal(data.signal);
        });
      })
      .catch((err) => {
        console.log('error in getting stream', err);
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  // when we create a new peer, the signal event fires, we capture the signal and send it down to each individual
  const createPeer = (userToSignal, callerID, userStream) => {
    const audioTrack = userStream.getAudioTracks();
    const user3DStream = threeCanvasRef.current.captureStream();

    // console.log('send user stream create peer', userModStream);

    user3DStream.addTrack(audioTrack[0]);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: user3DStream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });
    peer.on('stream', (currentStream) => {
      console.log('getting stream from receiver :>> ', currentStream);
      userVideo.current.srcObject = currentStream;
    });
    return peer;
  };

  // incomingSignal is sent when new person comes into room, users wait for that signal before firing off their own signal back to the initiator(the one who joined the room)
  const addPeer = (incomingSignal, callerID, userStream) => {
    // when a peer's initiator is false, they only signal when they receive a signal
    const audioTrack = userStream.getAudioTracks();
    const user3DStream = threeCanvasRef.current.captureStream();
    // const userModStream = myVideoModified.current.captureStream();
    console.log('send user stream from addPeer', user3DStream);
    user3DStream.addTrack(audioTrack[0]);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: user3DStream,
      // stream: userModStream,
    });
    console.log('callerId from add peer :>> ', callerID);

    peer.on('signal', (signal) => {
      // sends back to the server and then back to the callerID to complete handshake
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.on('stream', (currentStream) => {
      console.log('getting stream from new peer :>> ', currentStream);
      userVideo.current.srcObject = currentStream;
    });
    // fires the above event to fire
    peer.signal(incomingSignal);

    return peer;
  };
  const classes = useStyles();

  console.log('videoPlayer running');
  return (
    <div>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={4}>
          <VideoFrame
            key="videoFrame"
            name={username}
            videoRef={myVideo}
            canvasRef={myVideoModified}
            threeCanvasRef={threeCanvasRef}
            styles={classes}
            videoIsSet={videoIsSet}
          />
        </Grid>
        <Grid item xs={4}>
          {peers.map((peer, index) => (
            <OtherVideoFrame name="other person" videoRef={userVideo} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Room;