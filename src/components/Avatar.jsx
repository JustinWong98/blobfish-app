import React, { useRef, useEffect, useContext, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { videoStyles } from '../modules/useStyles.jsx';
import { AvatarJSONContext } from '../App.js';
import * as THREE from 'three';
import { CubeHead } from './Avatars/CubeHead';
import { Blobfish } from './Avatars/Blobfish.jsx';
import { Light } from './Avatars/Light';
import { GroundPlane, BackDrop } from './Avatars/Background';
import { Stars, Sky, Text } from '@react-three/drei';
// import { OrthographicCamera } from 'three';

// ability to fetch different types of avatars here
export const Avatar = ({
  avatarJSON,
  coordinates,
  faceCalculations,
  username,
  // faceCalculations = {
  //   angle: {
  //     pitch: 0,
  //     yaw: 0,
  //     roll: 0,
  //   },
  //   leftEyeOpening: 1,
  //   rightEyeOpening: 1,
  //   mouthDim: {
  //     mouthLen: 0,
  //     mouthMidBot: 0,
  //     mouthTopBot: 0,
  //   },
  // },
}) => {
  const [chosenAvatar, setChosenAvatar] = useState();
  // console.log('faceCalculations.current :>> ', faceCalculations.current);
  useEffect(() => {
    console.log(avatarJSON.model);
    switch (avatarJSON.model) {
      case 'BlobfishDefault':
        setChosenAvatar(
          <Blobfish
            faceCalculations={faceCalculations}
            xAxis={2.5}
            yAxis={2.5}
            zAxis={2.5}
            size={1}
          />
        );
        break;
      case 'CubeHeadDefault':
        setChosenAvatar(
          <CubeHead
            faceCalculations={faceCalculations}
            headHeight={2.5}
            headWidth={2}
            headLength={2}
            earLength={2}
            headColor="#808080"
            earColor="#ffff00"
            eyeColor="#0000ff"
          />
        );
        break;
      case 'Blobfish':
        setChosenAvatar(
          <Blobfish
            faceCalculations={faceCalculations}
            xAxis={avatarJSON.xAxis}
            yAxis={avatarJSON.yAxis}
            zAxis={avatarJSON.zAxis}
            size={avatarJSON.size}
          />
        );
        break;
      case 'CubeHead':
        setChosenAvatar(
          <CubeHead
            faceCalculations={faceCalculations}
            headHeight={avatarJSON.headHeight}
            headWidth={avatarJSON.headWidth}
            headLength={avatarJSON.headLength}
            earLength={avatarJSON.earLength}
            headColor={avatarJSON.headColor}
            earColor={avatarJSON.earColor}
            eyeColor={avatarJSON.eyeColor}
          />
        );
        break;
      default:
        return;
    }
  }, [avatarJSON]);

  const myMesh = useRef();

  useFrame((state, delta) => {
    const { angle } = faceCalculations.current;
    // console.log('state in useFrame :>> ', state);
    // console.log('delta in useFrame :>> ', delta * 1000);
    myMesh.current.rotation.x = angle.pitch * 1.5; //up down tilt
    myMesh.current.rotation.y = -angle.yaw * 1.5;
    myMesh.current.rotation.z = -angle.roll * 0.5; //left right tilt
    if (coordinates !== undefined) {
      myMesh.current.position.set(
        coordinates.current.x,
        coordinates.current.y,
        coordinates.current.z
      );
    }
  });

  return (
    <group ref={myMesh}>
      <Text
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, 3.5, 1]}
        scale={[7, 7, 7]}
        // scale={[10, 10, 10]}
      >
        {username}
      </Text>
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
  avatarJSON,
  setAvatarJSON,
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
        <Avatar
          faceCalculations={faceCalculations}
          avatarJSON={avatarJSON}
          setAvatarJSON={setAvatarJSON}
        />
      </Canvas>
    </div>
  );
};
