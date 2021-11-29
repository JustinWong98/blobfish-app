import React, { useRef, useEffect, useContext, useState } from 'react';
import { AvatarPeer } from '../AvatarPeer.jsx';
import { Terrain, Box, extents } from '../World/baseElements.jsx';
import AvatarContainer from '../BaseAvatars/AvatarContainer';
import { Canvas, useFrame } from '@react-three/fiber';

// ability to fetch different types of avatars here
export const OtherAvatars = ({
  dataPeersRef,
  dataPeers,
  avatarCollection,
  username,
}) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(
    'avatarCollection.current in otherAvatars :>> ',
    avatarCollection.current
  );
  const avatarObjs = Object.entries(avatarCollection.current);
  console.log('avatarObjs :>> ', avatarObjs);
  const avatarNames = Object.keys(avatarCollection.current);
  const otherAvatarNames = avatarNames.filter((name) => name !== username);

  const avatars = otherAvatarNames.map((avatar) => (
    <AvatarPeer
      username={avatar}
      avatarJSON={avatarCollection.current[avatar].avatarJSON}
      coord={avatarCollection.current[avatar].coordinates}
      faceCalculations={avatarCollection.current[avatar].faceCalculations}
      time={time}
    />
  ));

  //face calculations from peer sends
  return <group>{avatars}</group>;
};
