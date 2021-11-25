import { Suspense, useRef, useState, useEffect } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Blobfish } from '../components/BaseAvatars/Blobfish';
import Container from '@mui/material/Container';
import * as THREE from 'three';
import { VideoFrame } from '../components/VideoElements';

import { Terrain, Box } from '../components/World/baseElements.jsx';

import {
  handleKeyDown,
  handleKeyUp,
  CameraController,
} from '../components/World/CameraController';
import { getWebCamStream } from '../modules/webcam';

import { calculateFaceAngle } from '../components/face/angles.mjs';
import {
  leftEyeOpenRatio,
  rightEyeOpenRatio,
  normMouthDimensions,
} from '../components/utils_3d.mjs';

import { FaceMesh } from '@mediapipe/face_mesh';
import * as Facemesh from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import * as draw from '@mediapipe/drawing_utils';

import { videoStyles } from '../modules/useStyles.jsx';

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
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    // faceMesh.onResults(onResults);
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
  });

  return (
    <>
      <video>
        playsInline ref={videoRef}
        autoPlay muted className={styles.video}
        {/* style={{ display: 'none' }} */}
      </video>
      {/* <VideoFrame
        key="videoFrame"
        name={''}
        videoRef={myVideo}
        canvasRef={myVideoModified}
        threeCanvasRef={threeCanvasRef}
        videoIsSet={videoIsSet}
        avatarModel={avatarModel}
      /> */}
      <Canvas style={{ background: 'skyblue' }}>
        <CameraController />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <Blobfish
          // faceAngles={faceAngles}
          // leftEyeOpening={leftEyeOpening}
          // rightEyeOpening={rightEyeOpening}
          // mouthDim={mouthDim}
          />
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
