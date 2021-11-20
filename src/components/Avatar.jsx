import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CubeHead } from './Avatars/CubeHead';
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
    <CubeHead
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
    <group position={[0, 0, 0]} ref={myMesh}>
      {chosenAvatar}
    </group>
  );
};

export const ThreeCanvas = ({
  threeCanvasRef,
  styles,
  faceWidth,
  faceHeight,
  faceAngles,
  leftEyeOpening,
  rightEyeOpening,
  mouthDim,
}) => {
  console.log('running three');
  console.log('faceAngles in Three canvas :>> ', faceAngles);
  console.log('threeCavasRef :>> ', threeCanvasRef);
  return (
    <div id="canvas-container" className={styles.video}>
      <Canvas ref={threeCanvasRef}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
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
