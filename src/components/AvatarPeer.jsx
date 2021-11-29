import React, { useRef, useEffect, useContext, useState } from 'react';

import { Avatar } from './Avatar.jsx';

// import { OrthographicCamera } from 'three';

// ability to fetch different types of avatars here
export const AvatarPeer = ({
  username,
  avatarJSON,
  coord,
  faceCalculations = {
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
  },
}) => {
  const [time, setTime] = useState(Date.now());
  const coordinates = useRef(coord);
  const faceCalc = useRef(faceCalculations);
  console.log(
    'running in AvatarPeer',
    coord,
    faceCalculations,
    avatarJSON,
    username
  );
  coordinates.current = { x: coord.x, y: coord.y, z: coord.z };
  faceCalc.current = { ...faceCalculations };

  useEffect(() => {
    const interval = setInterval(setTime(Date.now()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Avatar
      avatarJSON={avatarJSON}
      coordinates={coordinates}
      faceCalculations={faceCalc}
      time={time}
    />
  );
};
