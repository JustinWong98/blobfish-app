import {
  Suspense,
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import { listener } from '../modules/sockets.mjs';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Terrain, Box, extents } from '../components/World/baseElements.jsx';
import { SocketContext } from '../components/context/sockets.js';
import { CameraController } from '../components/World/CameraController';
import { getWebCamStream } from '../modules/webcam';
import * as cam from '@mediapipe/camera_utils';
//  import
import {
  onResultsCalFace,
  faceMeshSetup,
} from '../components/face/facemesh.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { OtherAvatars } from '../components/World/OtherAvatars.jsx';
import { AvatarJSONContext } from '../App.js';
import { Stars, Sky, Text } from '@react-three/drei';
import { extent } from '../components/World/baseElements.jsx';
import { OtherAudio } from '../components/World/audio.jsx';
import {
  PlayerController,
  handleKeyDown,
  handleKeyUp,
} from '../components/World/PlayerController.jsx';
import { PermMediaRounded } from '@material-ui/icons';
import SpriteText from 'three-spritetext';
// gets stream of playermotions in the world
// head rotation, eye and mouth motion, position in xz space
// player model, player usename
// get stream of playerAudio in the world, join them
function World({ username }) {
  console.log('loading world');
  const { worldID } = useParams();
  console.log('username in world :>> ', username);
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
  const stream = useRef(new MediaStream());
  const placeHolderMediaStream = new MediaStream();
  const audioStream = useRef(placeHolderMediaStream);

  // SOCKETS
  const socket = useContext(SocketContext);
  const socketRef = useRef();
  socketRef.current = socket;

  // PEERS FOR AUDIO STREAM
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);

  //PEERS FOR DATA CHANNEL
  const [dataPeers, setDataPeers] = useState([]);
  const dataPeersRef = useRef([]);

  console.log('peersRef in world :>> ', peersRef);
  // CONNECTIONS

  const receiverSendSignal = (data) => {
    // find peer that we are receiving from since we are going to receive multiple peers.
    // we loop through the list of peers and match the id of the one trying to signal us
    const item = peersRef.current.find((p) => p.peerID === data.id);
    item.peer.signal(data.signal);
  };
  const receiverDataSendSignal = (data) => {
    console.log('in receiver data send signal');
    // find peer that we are receiving from since we are going to receive multiple peers.
    // we loop through the list of peers and match the id of the one trying to signal us
    const item = dataPeersRef.current.find((p) => p.peerID === data.id);
    item.peer.signal(data.signal);
  };

  const callUserSetCall = ({ from, name: callerName, signal }) => {
    setCall({ isReceivingCall: true, from, name: callerName, signal });
  };

  const getUsers = (users) => {
    const peers = [];
    // iterate through users list received from server
    console.log('users in getusers :>> ', users);
    users.forEach(({ userID, username, avatarJSON, coordinates }) => {
      // for each user, create a peer and send in our id and stream
      // TODO: CHANGE STREAM TO DATA CHANNEL?? NOPE CHANGE TO AUDIO STREAM AND IMPLEMMENT SEPARATE DATA CHANNEL
      //TO MOD INTO AUDIO CHANNEL
      // connect local peer to remote peer
      const peer = createPeer(
        userID,
        socketRef.current.id,
        audioStream.current
      );

      // peersRef will handle collection of peers (all simple peer logic)
      // pass in user info, remote peers
      console.log('peersRef in get users before:>> ', peersRef);
      // remove previous instances of peers
      // const filterPeersRef = peersRef.current.filter(
      //   (peer) => peer.username !== username
      // );
      // filterPeersRef.push({
      //   username,
      //   avatarJSON,
      //   coordinates,
      //   peerID: userID,
      //   peer,
      // });

      // peersRef.current = filterPeersRef;
      peersRef.current.push({
        username,
        avatarJSON,
        coordinates,
        peerID: userID,
        peer,
      });
      console.log('peersRef in get users :>> ', peersRef);
      // setting state of array of peers for rendering purposes
      // remove previous instances of peers
      peers.push(peer);
    });
    setPeers(peers);
  };

  const getDataUsers = (users) => {
    const dataPeers = [];
    // iterate through users list received from server
    console.log('users in getusers :>> ', users);
    users.forEach(({ userID, username, avatarJSON, coordinates }) => {
      // for each user, create a peer and send in our id and stream
      // TODO: CHANGE STREAM TO DATA CHANNEL?? NOPE CHANGE TO AUDIO STREAM AND IMPLEMMENT SEPARATE DATA CHANNEL
      //TO MOD INTO AUDIO CHANNEL
      // connect local peer to remote peer
      const dataPeer = createDataPeer(userID, socketRef.current.id);

      // peersRef will handle collection of peers (all simple peer logic)
      // pass in user info, remote peers
      console.log('peersRef in get users before:>> ', dataPeersRef);
      // remove previous instances of peers

      // const filterDataPeerRef = dataPeersRef.current.filter(
      //   (peer) => peer.username !== username
      // );
      // filterDataPeerRef.push({
      //   username,
      //   avatarJSON,
      //   coordinates,
      //   peerID: userID,
      //   peer: dataPeer,
      // });

      // dataPeersRef.current = filterDataPeerRef;
      dataPeersRef.current.push({
        username,
        avatarJSON,
        coordinates,
        peerID: userID,
        peer: dataPeer,
      });
      console.log('peersRef in get users :>> ', peersRef);
      // setting state of array of peers for rendering purposes
      // remove previous instances of peers
      dataPeers.push(dataPeer);
    });
    setDataPeers(dataPeers);
  };
  const createPeer = (userToSignal, callerID, userStream) => {
    console.log('streaming from create peer :>> ', userStream);
    //create all otejr peers? this is not loacal?
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: userStream,
    });

    // send local user's info
    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        avatarJSON,
        username,
        coordinates: coordinates.current,
        userToSignal,
        callerID,
        signal,
      });
      console.log('peer signal in create:>> ', signal);
    });

    peer.on('connect', () => {});

    return peer;
  };
  const createDataPeer = (userToSignal, callerID) => {
    console.log('in createDataPeer');

    //create all otejr peers? this is not loacal?
    const dataPeer = new Peer({
      initiator: true,
      trickle: false,
      stream: false,
    });

    // send local user's info
    dataPeer.on('signal', (signal) => {
      socketRef.current.emit('sending data signal', {
        avatarJSON,
        username,
        coordinates: coordinates.current,
        userToSignal,
        callerID,
        signal,
      });
      console.log('peer signal in create: dataPeer>> ', signal);
    });

    //sending something
    dataPeer.on('data', (data) => {
      // this person is who <-> callerID
      console.log('received in create dataPeer: ' + JSON.parse(data));
      // peer.send('data sent in return from peer ' + data);
    });
    return dataPeer;
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
    peer.on('connect', () => {
      console.log('CONNECT in add peer');
    });

    return peer;
  };
  const addDataPeer = (incomingSignal, callerID) => {
    console.log('in addDataPeer');
    // when a peer's initiator is false, they only signal when they receive a signal

    const dataPeer = new Peer({
      initiator: false,
      trickle: false,
      stream: false,
    });

    console.log('callerId from add peer :>> ', callerID);

    dataPeer.on('signal', (signal) => {
      // sends back to the server and then back to the callerID to complete handshake
      socketRef.current.emit('returning data signal', { signal, callerID });
      console.log('peer signal in add data peer:>> ', signal);
    });
    // fires the above event to fire
    dataPeer.signal(incomingSignal);
    dataPeer.on('connect', () => {
      console.log('CONNECT in add dataPeer');
      dataPeer.send('send from add dataPeer' + Math.random());
    });

    return dataPeer;
  };

  //just one user
  const newUserJoins = ({
    signal,
    callerID,
    username,
    avatarJSON,
    coordinates,
  }) => {
    console.log('callId in user joined:>> ', callerID);
    // TODO: CHANGE TO AUDIO STREAM, DATA CHANEL FOR PLAYER MOVEMENTS
    const peer = addPeer(signal, callerID, audioStream.current);
    console.log('peer._id :>> ', peer._id);
    console.log('peersRef in newUserJoins before :>> ', peersRef);
    // clean list of previous instances before pushing
    const filterPeerRef = peersRef.current.filter(
      (peer) => peer.username !== username
    );
    filterPeerRef.push({
      username,
      avatarJSON,
      coordinates,
      peerID: callerID,
      peer,
    });
    peersRef.current = filterPeerRef;
    // peersRef.current.push();
    console.log('peersRef in newUserJoins :>> ', peersRef);
    peer.on('connect', () => {
      console.log('CONNECT in newUserJoins');
      //send avatar info, json, socket id?

      // this peer is sending
      // peer.send(JSON.stringify())
      peer.send('sending from newUser' + Math.random());
    });
    //sending something
    //send position, send face dims
    peer.on('data', (data) => {
      console.log('receive new user', JSON.parse(data));
      // peer.send('received' + data);
    });
    setPeers((users) => [...users, peer]);
  };
  const newDataUserJoins = ({
    signal,
    callerID,
    username,
    avatarJSON,
    coordinates,
  }) => {
    console.log('in newDataUserJoins');
    // TODO: CHANGE TO AUDIO STREAM, DATA CHANEL FOR PLAYER MOVEMENTS
    const dataPeer = addDataPeer(signal, callerID);

    // clean list of previous instances before pushing
    const filterPeerRef = dataPeersRef.current.filter(
      (peer) => peer.username !== username
    );
    filterPeerRef.push({
      username,
      avatarJSON,
      coordinates,
      peerID: callerID,
      peer: dataPeer,
    });
    dataPeersRef.current = filterPeerRef;
    // peersRef.current.push();
    console.log('dataPeersRef in newUserJoins :>> ', dataPeersRef);
    dataPeer.on('connect', () => {
      console.log('CONNECT in newDataUserJoins');
      //send avatar info, json, socket id?

      // this peer is sending
      // peer.send(JSON.stringify())
      dataPeer.send('sending from newUser' + Math.random());
    });
    //sending something
    //send position, send face dims
    dataPeer.on('data', (data) => {
      console.log('receive new user', JSON.parse(data));
      // peer.send('received' + data);
    });
    setDataPeers((users) => [...users, dataPeer]);
  };

  const disconnectUser = (user) => {
    //remove peer from peersRef by id first
    console.log('peersRef.current before removal :>> ', peersRef.current);
    const disconnectingID = user[0].userID;
    const disconnectingPeer = peersRef.current.filter(
      (peer) => peer.peerID === disconnectingID
    );
    // disconnectingPeer.destroy();
    const peersLeft = peersRef.current.filter(
      (peer) => peer.peerID !== disconnectingID
    );
    peersRef.current = peersLeft;
    console.log('peersRef.current :>> ', peersRef.current);
    //remove peer by name
  };

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

  const getVideoAudioStream = useCallback(async () => {
    await getWebCamStream(stream, videoRef, setVideo);

    const audioTrack = stream.current.getAudioTracks();
    console.log('audioTrack :>> ', audioTrack);
    audioStream.current.addTrack(audioTrack[0]);
    const peer = new Peer({
      initiator: true,
      // stream: audioStream.current,
      trickle: false,
    });
    console.log('audioStream.current :>> ', audioStream.current);
  });
  const sendUserMovement = () => {
    const avatarMovement = {
      faceCalculations: faceCalculations.current,
      coordinates: coordinates.current,
      username,
    };
    const avatarMoveStr = JSON.stringify(avatarMovement);
    // console.log('dataPeers :>> ', dataPeers);
    dataPeers.forEach((peer) => {
      //check readystate
      if (peer._channel) {
        const state = peer._channel.readyState;
        if (state === 'open') {
          peer.send(avatarMoveStr);
          console.log('sent data in create: ' + avatarMoveStr);
        } else {
          console.log('channel is not open', peer);
        }
      } else {
        console.log('peer in undefined', peer);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(sendUserMovement, 1);
    return () => {
      clearInterval(interval);
    };
  }, [dataPeers]);
  useEffect(() => {
    console.log('use effect in videoPlayer');

    getVideoAudioStream();
    //everytime faceCalculates, or player moves, peers will send

    // socket to emit that room is joined
    // send in a username
    socketRef.current.emit('joined room', {
      roomID: worldID,
      username,
      avatarJSON,
      coordinates: coordinates.current,
    });
    socketRef.current.emit('joined data room', {
      roomID: worldID,
      username,
      avatarJSON,
      coordinates: coordinates.current,
    });

    socketRef.current.on('get users', getUsers);
    socketRef.current.on('get data users', getDataUsers);
    socketRef.current.on('user joined', newUserJoins);
    socketRef.current.on('user data joined', newDataUserJoins);
    socketRef.current.on('receiving returned signal', receiverSendSignal);
    socketRef.current.on(
      'receiving data returned signal',
      receiverDataSendSignal
    );
    // on user disconnect remove them? get again
    socketRef.current.on('');
    socket.on('callUser', callUserSetCall);
    socket.onAny(listener);
    socket.on('disconnect user', disconnectUser);
    return () => {
      socketRef.current.off('get users', getUsers);
      socketRef.current.off('user joined', newUserJoins);
      socketRef.current.off('user data joined', newDataUserJoins);
      socketRef.current.off('receiving returned signal', receiverSendSignal);
      socket.off('callUser', callUserSetCall);
      socket.offAny(listener);
      socket.off('disconnect user', disconnectUser);
      socketRef.current.off(
        'receiving data returned signal',
        receiverDataSendSignal
      );
    };
  }, []);

  useEffect(() => {
    console.log('useEffect running in vid frame');
    const faceMesh = faceMeshSetup();
    faceMesh.onResults((results) => {
      onResultsCalFace(results, videoRef, setFaceMeshStart, faceCalculations);
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
        // muted
        style={{ display: 'none' }}
      />
      <Canvas camera={{}}>
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <CameraController />
        <PlayerController coordinates={coordinates} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <group
            position={[
              coordinates.current.x,
              coordinates.current.y,
              coordinates.current.z,
            ]}
          > 
            <Text
            color="black" // default
            anchorX="center" // default
            anchorY="middle" // default
            position={[coordinates.current.x, coordinates.current.y+5, coordinates.current.z]}
            scale={[10, 10, 10]}
          >
           {username}
          </Text>
            {faceCalculations.current && (
              <Avatar
                coordinates={coordinates}
                faceCalculations={faceCalculations}
                avatarJSON={avatarJSON}
              />
            )}
          </group>
          <OtherAvatars peersRef={peersRef} peers={peers} />
          {/* componet renders all other avatars, it should use peerRef 
          peers for update of avatar models in map */}
          <Terrain />
        </Suspense>
        {/* The X axis is red. The Y axis is green. The Z axis is blue */}
        <axesHelper />
      </Canvas>
      {peers.map((peer, index) => (
        <OtherAudio name="other person" peer={peer} />
      ))}
      {/* audio from everyone */}
    </>
  );
}

export default World;
