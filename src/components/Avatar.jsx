import React, { useRef, useEffect, useContext, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { videoStyles } from '../modules/useStyles.jsx';
import { AvatarJSONContext } from '../App.js';
import * as THREE from 'three';
import { CubeHead } from './Avatars/CubeHead';
import { Blobfish } from './Avatars/Blobfish.jsx';
import { Light } from './Avatars/Light';
import { GroundPlane, BackDrop } from './Avatars/Background';
import { Stars, Sky } from '@react-three/drei';
// import { OrthographicCamera } from 'three';

// ability to fetch different types of avatars here
export const Avatar = ({ faceCalculations, avatarJSON, setAvatarJSON }) => {
  const [chosenAvatar, setChosenAvatar] = useState()
  console.log('faceCalculations.current :>> ', faceCalculations.current);
  useEffect(() => {
    if (avatarJSON === 'Blobfish'){
          console.log(`avatarJSON`, avatarJSON)
      setChosenAvatar(<Blobfish faceCalculations={faceCalculations} xAxis={2.5} yAxis={2.5} zAxis={2.5} size={1} />)
    }
    else if (avatarJSON === 'CubeHead') {
        console.log('faceCalculations.current :>> ', faceCalculations.current);
      setChosenAvatar(<CubeHead faceCalculations={faceCalculations} headHeight={2.5} headWidth={2} headLength={2} earLength={2} headColor='#808080' earColor='#ffff00' eyeColor='#0000ff'/>)
    }
    switch (avatarJSON.model) {
      case 'Blobfish':
        setChosenAvatar(<Blobfish faceCalculations={faceCalculations} xAxis={avatarJSON.xAxis} yAxis={avatarJSON.yAxis} zAxis={avatarJSON.zAxis} size={avatarJSON.size} />)
        break
      case 'CubeHead':
         setChosenAvatar(<CubeHead faceCalculations={faceCalculations} headHeight={avatarJSON.headHeight} headWidth={avatarJSON.headWidth} headLength={avatarJSON.headLength} earLength={avatarJSON.earLength} headColor={avatarJSON.headColor} earColor={avatarJSON.earColor} eyeColor={avatarJSON.eyeColor}/>)
        break
      default:
        return
    }
  }, [avatarJSON])
  // let chosenAvatar = <Blobfish faceCalculations={faceCalculations} />;

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

export const ThreeCanvas = ({ threeCanvasRef, faceCalculations, avatarJSON, setAvatarJSON }) => {
  const styles = videoStyles();

  console.log('running three');
  return (
    <div id="canvas-container" className={styles.avatar}>
      <Canvas ref={threeCanvasRef}>
        <ambientLight intensity={0.1} />
        {/* Light destroys blobfish color */}
        <directionalLight position={[0, 0, 5]} />
        <orthographicCamera makeDefault position={[0, 0, 0]} zoom={0} />
        <Avatar faceCalculations={faceCalculations}             avatarJSON={avatarJSON}
        setAvatarJSON={setAvatarJSON}/>
      </Canvas>
    </div>
  );
};
