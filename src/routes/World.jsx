import { Suspense, useRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import { listener } from '../modules/sockets.mjs';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { VideoFrame } from '../components/VideoElements';
// import { Physics, userBox } from 'use-cannon';
import { Terrain, Box, extents } from '../components/World/baseElements.jsx';
import { SocketContext } from '../components/context/sockets.js';
import {
  handleKeyDown,
  handleKeyUp,
  CameraController,
} from '../components/World/CameraController';
import { getWebCamStream } from '../modules/webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
//  import
import {
  onResultsCalFace,
  faceMeshSetup,
} from '../components/face/facemesh.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { AvatarJSONContext } from '../App.js';
import { Stars, Sky } from '@react-three/drei';
import { extent } from '../components/World/baseElements.jsx';

// import {receiverSendSignal, getUsers, newUserJoins, createPeer, addPeer} from '../routes/Room.jsx'

// gets stream of playermotions in the world
// head rotation, eye and mouth motion, position in xz space
// player model, player usename
// get stream of playerAudio in the world, join them
function World({}) {
  console.log('loading world');
  const { worldID } = useParams();

  // FACE MESH CALC
  const videoRef = useRef();
  const [faceMeshStarted, setFaceMeshStart] = useState(false);
  // AVATAR
  const { avatarJSON, setAvatarJSON } = useContext(AvatarJSONContext);
  const coordinates = useRef({
    x: -extents / 10 + (Math.random() * extents) / 5,
    y: 0,
    z: -extents / 10 + (Math.random() * extents) / 5,
  });

  console.log('coordinates in world :>> ', coordinates);
  const faceCalculations = useRef({
    angle: {
      pitch: 0,
      yaw: 0,
      roll: 0,
    },
    leftEyeOpening: 1,
    rightEyeOpening: 1,
    mouthDim: {
      mouthLen: 0,
      mouthMidBot: 0,
      mouthTopBot: 0,
    },
  });

  // VIDEO
  const myVideo = useRef();
  const [videoIsSet, setVideo] = useState(false);
  const stream = useRef();
  const placeHolderMediaStream = new MediaStream();
  const streamLocal = useRef(placeHolderMediaStream);

  // SOCKETS
  const socket = useContext(SocketContext);
  const socketRef = useRef();
  socketRef.current = socket;

  // PEERS
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);

  // CONNECTIONS

  const receiverSendSignal = (data) => {
    // find peer that we are receiving from since we are going to receive multiple peers.
    // we loop through the list of peers and match the id of the one trying to signal us
    const item = peersRef.current.find((p) => p.peerID === data.id);
    item.peer.signal(data.signal);
  };

  const callUserSetCall = ({ from, name: callerName, signal }) => {
    setCall({ isReceivingCall: true, from, name: callerName, signal });
  };

  const getUsers = (users) => {
    const peers = [];
    users.forEach((userID) => {
      // for each user, create a peer and send in our id and stream
      // TODO: CHANGE STREAM TO DATA CHANNEL?? NOPE CHANGE TO AUDIO STREAM AND IMPLEMMENT SEPARATE DATA CHANNEL
      const peer = createPeer(userID, socketRef.current.id, stream.current);
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
  const createPeer = (userToSignal, callerID, userStream) => {
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
  const newUserJoins = ({ signal, callerID }) => {
    console.log('callId in user joined:>> ', callerID);
    // TODO: CHANGE TO AUDIO STREAM, DATA CHANEL FOR PLAYER MOVEMENTS
    const peer = addPeer(signal, callerID, stream.current);
    peersRef.current.push({
      peerID: callerID,
      peer,
    });

    setPeers((users) => [...users, peer]);
  };
  // useEffect(() => {
  //   console.log('use effect in world for getting camera');
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       stream.current = currentStream;
  //       //plays video in steam
  //       myVideo.current.srcObject = currentStream;
  //       console.log(
  //         'myVideo.current.srcObject :>> ',
  //         myVideo.current.srcObject
  //       );
  //       socketRef.current.emit('joined room', worldID);
  //       setVideo(true);
  //       // person who joins connects to other peers
  //     })
  //     .then(() => {
  //       // when handshake is complete - receiver gives back a signal
  //       socketRef.current.on('get users', getUsers);
  //       socketRef.current.on('user joined', newUserJoins);
  //       socketRef.current.on('receiving returned signal', receiverSendSignal);

  //       // on user disconnect remove them? get again
  //       socketRef.current.on('');
  //     })
  //     .catch((err) => {
  //       console.log('error in getting stream', err);
  //     });

  //   socket.on('me', setMe);
  //   socket.on('callUser', callUserSetCall);
  //   // socket.on('me', (id) => setMe(id));

  //   // on the receiver end, this fires when a new user joins
  //   //CHECKER
  //   socket.onAny(listener);

  //   return () => {
  //     socketRef.current.off('receiving returned signal', receiverSendSignal);
  //     socket.off('me', setMe);
  //     socket.off('callUser', callUserSetCall);
  //     socket.offAny(listener);

  //     socketRef.current.off('get users', getUsers);
  //     socketRef.current.off('user joined', newUserJoins);
  //   };
  // }, []);

  // decide on world dimensions
  console.log('avatarJSON :>> ', avatarJSON);
  useEffect(() => {
    console.log('in world use efeect');
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      console.log('removing keydown listener');
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    console.log('use effect in videoPlayer');
    getWebCamStream(stream, videoRef, setVideo);
    //socket to emit that room is joined
    socketRef.current.emit('joined room', worldID);
    socketRef.current.on('get users', getUsers);
    socketRef.current.on('user joined', newUserJoins);
    socketRef.current.on('receiving returned signal', receiverSendSignal);
    // on user disconnect remove them? get again
    socketRef.current.on('');
    socket.on('me', setMe);
    socket.on('callUser', callUserSetCall);
    socket.onAny(listener);

    return () => {
      socketRef.current.off('get users', getUsers);
      socketRef.current.off('user joined', newUserJoins);
      socketRef.current.off('receiving returned signal', receiverSendSignal);
      socket.off('me', setMe);
      socket.off('callUser', callUserSetCall);
      socket.offAny(listener);
    };
  }, []);

  useEffect(() => {
    console.log('useEffect running in vid frame');
    const faceMesh = faceMeshSetup();
    faceMesh.onResults((results) => {
      onResultsCalFace(results, videoRef, setFaceMeshStart, faceCalculations);
      // console.log('faceCalculations.current :>> ', faceCalculations.current);
    });
    if (
      typeof videoRef.current.srcObject !== 'undefined' &&
      videoRef.current.srcObject !== null
    ) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
      });
      camera.start();
    }
  });
  // HEAD ROTATION IS CAMERA ROTATION. BAD IDEA
  // NAME TAG FOR EACH AVATAR

  //STREAM FACE CALCULATIONS AND AUDIO

  return (
    <>
      <video
        playsInline
        ref={videoRef}
        autoPlay
        muted
        style={{ display: 'none' }}
      />

      <Canvas
        camera={{
          position: [
            coordinates.current.x,
            coordinates.current.y,
            coordinates.current.z,
          ],
        }}
      >
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <CameraController
          // setCoordinates={setCoordinates}
          coordinates={coordinates}
        />

        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <group
            position={[
              coordinates.current.x,
              coordinates.current.y,
              coordinates.current.z,
            ]}
          >
            {faceCalculations.current && (
              <Avatar
                faceCalculations={faceCalculations}
                avatarJSON={avatarJSON}
              />
            )}

            {faceCalculations.current && (
              <Avatar
                faceCalculations={faceCalculations}
                avatarJSON={avatarJSON}
                // placeholder for now
                setAvatarJSON={setAvatarJSON}
              />
            )}
          </group>
          <Terrain />
        </Suspense>
        {/* The X axis is red. The Y axis is green. The Z axis is blue */}
        <axesHelper />
      </Canvas>
    </>
  );
}

export default World;
