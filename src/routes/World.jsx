import { Suspense, useRef, useState, useEffect, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { VideoFrame } from '../components/VideoElements';
// import { Physics, userBox } from 'use-cannon';
import { Terrain, Box } from '../components/World/baseElements.jsx';

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
import { videoStyles } from '../modules/useStyles.jsx';

import {
  onResultsCalFace,
  faceMeshSetup,
} from '../components/face/facemesh.jsx';

import { Avatar } from '../components/Avatar.jsx';
import { AvatarJSONContext } from '../App.js';
// gets stream of playermotions in the world
// head rotation, eye and mouth motion, position in xz space
// player model, player usename
// get stream of playerAudio in the world, join them
function World({ avatarModel }) {
  console.log('loading world');
  const { avatarJSON, setAvatarJSON } = useContext(AvatarJSONContext);
  const videoRef = useRef();
  const stream = useRef();
  const [videoIsSet, setVideo] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const styles = videoStyles();
  const [faceMeshStarted, setFaceMeshStart] = useState(false);

  const socket = useContext(SocketContext);

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

  //redirect to a standard world with standard id for socket emits

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
  }, [videoRef]);

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
        className={styles.video}
        style={{ display: 'none' }}
      />
      <Canvas
        style={{ background: 'skyblue' }}
        camera={{ position: [0, 0, 0] }}
      >
        <CameraController setCoordinates={setCoordinates}/>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <group position={[coordinates.x, coordinates.y, coordinates.z]}>
            {faceCalculations.current && (
              <Avatar faceCalculations={faceCalculations} />
            )
            } */}
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
