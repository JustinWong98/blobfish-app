import { Suspense, useRef, useState, useEffect } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Blobfish } from '../components/BaseAvatars/Blobfish';
import Container from '@mui/material/Container';
import * as THREE from 'three';

import { Terrain, Box } from '../components/World/baseElements.jsx';

import {
  handleKeyDown,
  handleKeyUp,
  CameraController,
} from '../components/World/CameraController';

// gets stream of playermotions in the world
// get stream of playerAudio in the world, join them
function World() {
  // const { camera, gl } = useThree();
  console.log('loading world');

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
  return (
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
  );
}

export default World;
