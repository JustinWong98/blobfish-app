import React, { useContext, useRef, useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../components/context/sockets.js';
// import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useParams } from 'react-router-dom';

import { VideoFrame, OtherVideoFrame } from '../components/VideoElements';

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
  const placeHolderMediaStream = new MediaStream();
  const stream3D = useRef(placeHolderMediaStream);

  // use a ref to populate video iframe with the src of stream
  const myVideo = useRef();
  const myVideoModified = useRef();
  const userVideo = useRef();
  const threeCanvasRef = useRef();
  const connectionRef = useRef();
  const socketRef = useRef();
  const [videoIsSet, setVideo] = useState(false);
  const [threeCanvasStarted, setThreeCStart] = useState(false);
  const [userVideoIsSet, setUserVideo] = useState(false);

  const socket = useContext(SocketContext);
  console.log('socket :>> ', socket);
  socketRef.current = socket;
  console.log('socketRef.current :>> ', socketRef.current);
  console.log('threeCanvasRef :>> ', threeCanvasRef);

   const receiverSendSignal = (data) => {
    // find peer that we are receiving from since we are going to receive multiple peers.
    // we loop through the list of peers and match the id of the one trying to signal us
    const item = peersRef.current.find((p) => p.peerID === data.id);
    item.peer.signal(data.signal);
  };

  const callUserSetCall = ({ from, name: callerName, signal }) => {
    setCall({ isReceivingCall: true, from, name: callerName, signal });
  };
  const listener = (eventName, ...args) => {
    console.log('socket eventName :>> ', eventName);
    console.log('args :>> ', args);
  };

  const getUsers = (users) => {
    const peers = [];
    users.forEach((userID) => {
      // for each user, create a peer and send in our id and stream
      const peer = createPeer(userID, socketRef.current.id, stream3D.current);
      // peersRef will handle collection of peers (all simple peer logic)
      peersRef.current.push({
        peerID: userID,
        peer,
      });
      // setting state of array of peers for rendering purposes
      peers.push(peer);
    });
    setPeers(peers);
  };

  const newUserJoins = ({ signal, callerID }) => {
    console.log('callId in user joined:>> ', callerID);
    const peer = addPeer(signal, callerID, stream3D.current);
    peersRef.current.push({
      peerID: callerID,
      peer,
    });

    setPeers((users) => [...users, peer]);
  };

  useEffect(() => {
    console.log('use effect in videoPlayer');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = currentStream;
        //plays video in steam
        myVideo.current.srcObject = currentStream;
        console.log(
          'myVideo.current.srcObject :>> ',
          myVideo.current.srcObject
        );
        socketRef.current.emit('joined room', roomID);
        setVideo(true);
        // person who joins connects to other peers
      })
      .then(() => {
        // when handshake is complete - receiver gives back a signal
        socketRef.current.on('get users', getUsers); 
        socketRef.current.on('user joined', newUserJoins);
        socketRef.current.on('receiving returned signal', receiverSendSignal);

        // on user disconnect remove them? get again
        socketRef.current.on('');
      })
      .catch((err) => {
        console.log('error in getting stream', err);
      });

    socket.on('me', setMe);
    socket.on('callUser', callUserSetCall);
    // socket.on('me', (id) => setMe(id));

    // on the receiver end, this fires when a new user joins
    //CHECKER
    socket.onAny(listener);

    return () => {
      socketRef.current.off('receiving returned signal', receiverSendSignal);
      socket.off('me', setMe);
      socket.off('callUser', callUserSetCall);
      socket.offAny(listener);

      socketRef.current.off('get users', getUsers);
      socketRef.current.off('user joined', newUserJoins);
    };
  }, []);

  useEffect(() => {
    // when threeCanvas loaded, update media stream
    // and if peer still exisiting
    if (stream.current !== undefined) {
      console.log('threeCanvasRef.current :>> ', threeCanvasRef.current);

      const audioTrack = stream.current.getAudioTracks();
      stream3D.current = threeCanvasRef.current.captureStream();
      stream3D.current.addTrack(audioTrack[0]);

      console.log('stream3D.current :>> ', stream3D.current);

      peers.forEach((peer) => {
        peer.removeStream(placeHolderMediaStream);
        peer.addStream(stream3D.current);
      });
    }

    return () => {};
  }, [threeCanvasStarted]);

  // when we create a new peer, the signal event fires, we capture the signal and send it down to each individual
  const createPeer = (userToSignal, callerID, userStream) => {
    console.log('threeCanvasRef.current :>> ', threeCanvasRef.current);
    console.log('streaming from create peer :>> ', userStream);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: userStream,
  
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
      console.log('peer signal in create:>> ', signal);
    });
    return peer;
  };

  // incomingSignal is sent when new person comes into room, users wait for that signal before firing off their own signal back to the initiator(the one who joined the room)
  const addPeer = (incomingSignal, callerID, userStream) => {
    // when a peer's initiator is false, they only signal when they receive a signal

    console.log('streaming from add peer :>> ', userStream);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userStream,
    });
    console.log('callerId from add peer :>> ', callerID);

    peer.on('signal', (signal) => {
      // sends back to the server and then back to the callerID to complete handshake
      socketRef.current.emit('returning signal', { signal, callerID });
      console.log('peer signal in add:>> ', signal);
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
            videoIsSet={videoIsSet}
            setThreeCStart={setThreeCStart}
          />
        </Grid>
        <Grid item xs={4}>
          {peers.map((peer, index) => (
            <OtherVideoFrame name="other person" peer={peer} />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Room;
