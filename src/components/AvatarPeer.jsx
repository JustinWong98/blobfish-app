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
import { Avatar } from './Avatar.jsx';

// import { OrthographicCamera } from 'three';

// ability to fetch different types of avatars here
export const AvatarPeer = ({ username, avatarJSON, coord, peer, peerID }) => {
  console.log('running in AvatarPeer');
  const coordinates = useRef(coord);
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
  //get face calculations and coordinates from peer
  //peer.receive?
  //check if username, id is the same

  const myMesh = useRef();

  // useFrame((state, delta) => {
  //   const { angle } = faceCalculations.current;
  //   // console.log('state in useFrame :>> ', state);
  //   // console.log('delta in useFrame :>> ', delta * 1000);
  //   myMesh.current.rotation.x = angle.pitch * 1.5; //up down tilt
  //   myMesh.current.rotation.y = -angle.yaw * 1.5;
  //   myMesh.current.rotation.z = -angle.roll * 0.5; //left right tilt
  //   if (coordinates !== undefined) {
  //     myMesh.current.position.set(
  //       coordinates.current.x,
  //       coordinates.current.y,
  //       coordinates.current.z
  //     );
  //   }
  // });

  return (
    <Avatar
      avatarJSON={avatarJSON}
      coordinates={coordinates}
      faceCalculations={faceCalculations}
    />
  );
};
