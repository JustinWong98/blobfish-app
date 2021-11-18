import React, { useContext, useRef, useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { SocketContext } from '../SocketContext.js';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as Facemesh from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import * as draw from '@mediapipe/drawing_utils';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useParams } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3002';

const socket = io(BACKEND_URL, {
  withCredentials: true,
  // rejectUnauthorized: false,
});
socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});
const drawConnectors = draw.drawConnectors;

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    height: '412px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
      heigth: '225px',
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

const Canvas = ({ canvasRef, styles }) => {
  return (
    <canvas
      ref={canvasRef}
      className={styles.video}
      style={{
        zindex: 10,
      }}
    ></canvas>
  );
};

// const getXYFromLandmark = (obj, videoRef) => {
//   const x = obj.x * videoRef.current.width;
//   const y = obj.y * videoRef.current.height;
//   return [x, y];
// };

const VideoFrame = ({ name, videoRef, canvasRef, styles }) => {
  function onResults(results) {
    const vidWidth = videoRef.current.videoWidth;
    const vidHeight = videoRef.current.videoHeight;

    canvasRef.current.width = vidWidth;
    canvasRef.current.height = vidHeight;

    const canvasElement = canvasRef.current;

    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        // draw.drawLandmarks(canvasCtx, landmarks, { color: '#FF3030' });

        // drawPolylineFromLandMark(landmarks);

        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
          color: '#C0C0C070',
          lineWidth: 1,
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
          color: '#FF3030',
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
          color: '#FF3030',
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {
          color: '#FF3030',
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
          color: '#30FF30',
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
          color: '#30FF30',
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {
          color: '#30FF30',
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
          color: '#E0E0E0',
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
          color: '#E0E0E0',
        });
      }
    }
    canvasCtx.restore();
  }

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.setOptions({
      // enableFaceGeometry: true,

      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);

    if (
      typeof videoRef.current.srcObject !== 'undefined' &&
      videoRef.current.srcObject !== null
    ) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 550,
        height: 412,
      });
      camera.start();
    }
  }, []);

  return (
    <Paper className={styles.paper}>
      <Typography variant="h5" gutterBottom>
        {name || ''}
      </Typography>

      <Grid item xs={12} md={12}>
        <video
          playsInline
          ref={videoRef}
          autoPlay
          // muted
          className={styles.video}
          style={{ display: 'none' }}
        />
        {/* REMOVE CANVAS, ^ Webcam may not be necessary  */}
        <Canvas canvasRef={canvasRef} styles={styles} />
      </Grid>
    </Paper>
  );
};

const OtherVideoFrame = ({ styles, videoRef, name }) => {
  return (
    <Paper className={styles.paper}>
      <Typography variant="h5" gutterBottom>
        {name || ''}
      </Typography>
      <Grid item xs={12} md={12}>
        <video playsInline ref={videoRef} autoPlay className={styles.video} />
      </Grid>
    </Paper>
  );
};

function VideoPlayer() {
  const {roomID} = useParams()
  const [stream, setStream] = useState();
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('')
  const [peers, setPeers] = useState([]);
    // array of peers for people in room    
  const peersRef = useRef([]);

  // use a ref to populate video iframe with the src of stream
  const myVideo = useRef();
  const myVideoModified = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const socketRef = useRef();
  socketRef.current = socket
  useEffect(() => {
    // socketRef.current = io.connect('http://localhost:3002');
      navigator.mediaDevices 
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        // TODO: Modify to facemesh
        setStream(currentStream);
        //plays video in steam
        myVideo.current.srcObject = currentStream;
        socketRef.current.emit('joined room', roomID)
        console.log(currentStream)
        console.log(myVideo.current.srcObject)
    // person who joins connects to other peers
    socketRef.current.on('get users', users => {
      const peers = [];
      users.forEach(userID => {
        // for each user, create a peer and send in our id and stream
        const peer = createPeer(userID, socketRef.current.id, myVideo.current.srcObject)
        // peersRef will handle collection of peers (all simple peer logic)
        peersRef.current.push({
          peerID: userID,
          peer,
        })
        // setting state of array of peers for rendering purposes
        peers.push(peer);
      })
      setPeers(peers);
    })
    // on the receiver end, this fires when a new user joins
    socketRef.current.on("user joined", ({signal, callerID}) => {
      console.log(stream)
      const peer = addPeer(signal, callerID, myVideo.current.srcObject);
      peersRef.current.push({
        peerID: callerID,
        peer,
      })

      setPeers(users => [...users, peer]);
    })
    // when handshake is complete - receiver gives back a signal
    socketRef.current.on('receiving returned signal', (data) => {
      // find peer that we are receiving from since we are going to receive multiple peers.
      // we loop through the list of peers and match the id of the one trying to signal us
      const item = peersRef.current.find(p => p.peerID === data.id);
      item.peer.signal(data.signal) 
    })
    
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  // const answerCall = () => {
  //   setCallAccepted(true);
  //   const audioTrack = stream.getAudioTracks()
  //   const userModStream = myVideoModified.current.captureStream();
  //   userModStream.addTrack(audioTrack[0])
  //   console.log('userModStream :>> ', userModStream);

  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: userModStream,
  //   });

  //   peer.on('signal', (data) => {
  //     socket.emit('answerCall', { signal: data, to: call.from });
  //   });

  //   peer.on('stream', (currentStream) => {
  //     console.log('getting stream from initiator');
  //     console.log('currentStream :>> ', currentStream);
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };

  // const callUser = (id) => {
  //   const audioTrack = stream.getAudioTracks()
  //   const userModStream = myVideoModified.current.captureStream();
  //   userModStream.addTrack(audioTrack[0])
  //   console.log('userModStream :>> ', userModStream);
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: userModStream,
  //   });
  //   peer.on('signal', (data) => {
  //     socket.emit('callUser', {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name,
  //     });
  //   });

  //   peer.on('stream', (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //     console.log('getting stream from initiator');
  //     console.log('currentStream :>> ', currentStream);
  //   });

  //   socket.on('callAccepted', (signal) => {
  //     setCallAccepted(true);

  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);

  //   connectionRef.current.destroy();

  //   window.location.reload();
  // };

  // when we create a new peer, the signal event fires, we capture the signal and send it down to each individual
  const createPeer = (userToSignal, callerID, stream) => {
    const audioTrack = stream.getAudioTracks()
    const userModStream = myVideoModified.current.captureStream();
    userModStream.addTrack(audioTrack[0])
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: userModStream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  // incomingSignal is sent when new person comes into room, users wait for that signal before firing off their own signal back to the initiator(the one who joined the room)
  const addPeer = (incomingSignal, callerID, userStream) => {
    console.log(userStream)
    // when a peer's initiator is false, they only signal when they receive a signal
    const audioTrack = userStream.getAudioTracks()
    console.log( audioTrack)
    const userModStream = myVideoModified.current.captureStream();
    userModStream.addTrack(audioTrack[0])
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userModStream,
    });
    
    peer.on('signal', (signal) => {
      // sends back to the server and then back to the callerID to complete handshake
      socketRef.current.emit('returning signal', { signal, callerID });
    });
    // fires the above event to fire
    peer.signal(incomingSignal);

    return peer
  };
  const classes = useStyles();
  // useEffect(() => {
  //   socketRef.current = io.connect('http://localhost:3002');
  //   socketRef.current.emit('joined room', roomID)
  //   socketRef.current.on('get users', users => {
  //     console.log('it ran!')
  //   })
  // }, [])
  // console.log(peers)
  return (
    <div>
      <Grid container className={classes.gridContainer}>
        {/* Make normal */}
        {stream && (
          <VideoFrame
            name={name}
            videoRef={myVideo}
            // TODO: remove canvasRef
            canvasRef={myVideoModified}
            styles={classes}
          />
        )}
        {peers.map((peer, index) => (
          <OtherVideoFrame
            name="other person"
            videoRef={userVideo}
            styles={classes}
          />
        ))}
      </Grid>
    </div>
  );
}

export default VideoPlayer;
