import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { videoStyles } from '../modules/useStyles.jsx';

import * as THREE from 'three';
import { CubeHead } from './Avatars/CubeHead';
import { Blobfish } from './Avatars/Blobfish.jsx';
import { Light } from './Avatars/Light';
import { GroundPlane, BackDrop } from './Avatars/Background';
import { Stars, Sky } from '@react-three/drei';
// import { OrthographicCamera } from 'three';

const Avatar = ({
  faceWidth,
  faceHeight,
  faceAngles,
  leftEyeOpening,
  rightEyeOpening,
  mouthDim,
}) => {
  let chosenAvatar = (
    <Blobfish 
      faceWidth={faceWidth}
      faceHeight={faceHeight}
      faceAngles={faceAngles}
      leftEyeOpening={leftEyeOpening}
      rightEyeOpening={rightEyeOpening}
      mouthDim={mouthDim}
    />
  );

  const myMesh = useRef();

  useFrame((state, delta) => {
    // console.log('state in useFrame :>> ', state);
    // console.log('delta in useFrame :>> ', delta * 1000);
    myMesh.current.rotation.x = faceAngles.current.pitch * 1.5; //up down tilt
    myMesh.current.rotation.y = -faceAngles.current.yaw * 1.5;
    myMesh.current.rotation.z = -faceAngles.current.roll * 0.5; //left right tilt
  });

  return (
    <group position={[-1, 0, 0]} ref={myMesh}>
      {/* <Stars /> */}
      {chosenAvatar}
      <GroundPlane />
      <BackDrop />
    </group>
  );
};

export const ThreeCanvas = ({
  canvasRef,
  threeCanvasRef,
  faceWidth,
  faceHeight,
  faceAngles,
  leftEyeOpening,
  rightEyeOpening,
  mouthDim,
}) => {
  const styles = videoStyles();

  console.log('running three');
  return (
    <div id="canvas-container" className={styles.avatar}>
      <Canvas ref={threeCanvasRef}>
        <ambientLight intensity={0.1} />
        {/* Light destroys blobfish color */}
        <directionalLight position={[0, 0, 5]} />
        <orthographicCamera makeDefault position={[0, 0, 0]} zoom={0} />
        <Avatar
          faceWidth={faceWidth}
          faceHeight={faceHeight}
          faceAngles={faceAngles}
          leftEyeOpening={leftEyeOpening}
          rightEyeOpening={rightEyeOpening}
          mouthDim={mouthDim}
        />
      </Canvas>
    </div>
  );
};

// if (
//   typeof videoRef.current.srcObject !== 'undefined' &&
//   videoRef.current.srcObject !== null
// ) {
//   const videoTexture = new VideoTexture(videoRef.current.srcObject);
// }
