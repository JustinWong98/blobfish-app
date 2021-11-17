import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// import { OrthographicCamera } from 'three';

const CubeHead = ({ faceWidth, faceHeight, faceAngles }) => {
  const myMesh = useRef();

  useFrame(({}) => {
    console.log('faceAngles :>> ', faceAngles);
    // const a = clock.getElapsedTime();
    // myMesh.current.rotation.x = a;
    myMesh.current.rotation.x = faceAngles.current.pitch * 1.5; //up down tilt
    myMesh.current.rotation.y = -faceAngles.current.yaw * 1.5;
    myMesh.current.rotation.z = -faceAngles.current.roll * 0.5; //left right tilt
    // myMesh.current.rotation.x = faceAngles.current.pitch * 1.2;
    // myMesh.current.rotation.y = -faceAngles.current.yaw * 1;
    // myMesh.current.rotation.z = faceAngles.current.roll * 1.7;
  });

  return (
    <mesh position={[0, 0, 0]} ref={myMesh}>
      <boxGeometry args={[2, 3, 2]} />
      {/* <sphereGeometry args={[2, 32, 16]} /> */}
      {/* <octahedronGeometry args={[2, 0]} /> */}
      <meshStandardMaterial color="white" />

      {/* <meshStandardMaterial color="blue" /> */}
      {/* <meshNormalMaterial color="blue" /> */}
      {/* <meshBasicMaterial color="blue" /> */}
    </mesh>
  );
};

export const ThreeCanvas = ({ styles, faceWidth, faceHeight, faceAngles }) => {
  console.log('running three');
  console.log('faceAngles in Three canvas :>> ', faceAngles);
  return (
    <div id="canvas-container" className={styles.video}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <orthographicCamera makeDefault position={[0, 0, 0]} zoom={0} />
        <CubeHead
          faceWidth={faceWidth}
          faceHeight={faceHeight}
          faceAngles={faceAngles}
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
