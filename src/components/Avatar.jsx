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

// ability to fetch different types of avatars here
export const Avatar = ({ faceCalculations }) => {
  console.log('faceCalculations.current :>> ', faceCalculations.current);
  let chosenAvatar = <Blobfish faceCalculations={faceCalculations} />;

  const myMesh = useRef();

  useFrame((state, delta) => {
    const { angle } = faceCalculations.current;
    // console.log('state in useFrame :>> ', state);
    // console.log('delta in useFrame :>> ', delta * 1000);
    myMesh.current.rotation.x = angle.pitch * 1.5; //up down tilt
    myMesh.current.rotation.y = -angle.yaw * 1.5;
    myMesh.current.rotation.z = -angle.roll * 0.5; //left right tilt
  });

  return (
    <group position={[0, 0, 0]} ref={myMesh}>
      {/* <Stars /> */}
      {chosenAvatar}
      {/* <GroundPlane />
      <BackDrop /> */}
    </group>
  );
};

export const ThreeCanvas = ({
  threeCanvasRef,
  faceCalculations,
  setThreeCStart,
}) => {
  const styles = videoStyles();
  if (setThreeCStart) {
    setThreeCStart(true);
  }
  console.log('running three');
  return (
    <div id="canvas-container" className={styles.avatar}>
      <Canvas ref={threeCanvasRef}>
        <ambientLight intensity={0.1} />
        {/* Light destroys blobfish color */}
        <directionalLight position={[0, 0, 5]} />
        <orthographicCamera makeDefault position={[0, 0, 0]} zoom={0} />
        <Avatar faceCalculations={faceCalculations} />
      </Canvas>
    </div>
  );
};
