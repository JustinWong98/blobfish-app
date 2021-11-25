import { Suspense, useRef, useState, useEffect } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { VideoFrame } from '../components/VideoElements';

import { Terrain, Box } from '../components/World/baseElements.jsx';

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
// gets stream of playermotions in the world
// head rotation, eye and mouth motion, position in xz space
// player model, player usename
// get stream of playerAudio in the world, join them
function World({ avatarModel }) {
  console.log('loading world');
  const videoRef = useRef();
  const myVideoModified = useRef();
  const threeCanvasRef = useRef();
  const stream = useRef();
  const [videoIsSet, setVideo] = useState(false);

  const styles = videoStyles();
  const [faceMeshStarted, setFaceMeshStart] = useState(false);

  const faceCalculations = useRef({
    angle: {
      pitch: 0,
      roll: 0,
      yaw: 0,
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
  ////
  return (
    <>
      <video
        playsInline
        ref={videoRef}
        autoPlay
        muted
        className={styles.video}
        // style={{ display: 'none' }}
      />
      {/* {videoRef && (
        <VideoFrame
          key="videoFrame"
          name={''}
          videoRef={videoRef}
          canvasRef={myVideoModified}
          threeCanvasRef={threeCanvasRef}
          videoIsSet={videoIsSet}
          avatarModel={avatarModel}
        />
      )} */}
      <Canvas style={{ background: 'skyblue' }}>
        <CameraController />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <Suspense fallback={null}>
          {faceCalculations.current && (
            <Avatar faceCalculations={faceCalculations} />
          )}
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Terrain />
        </Suspense>
        {/* The X axis is red. The Y axis is green. The Z axis is blue */}
        <axesHelper />
      </Canvas>
    </>
  );
}

export default World;
