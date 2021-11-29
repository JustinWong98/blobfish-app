import React, { useRef, useEffect, useContext, useState } from 'react';
import { AvatarPeer } from '../AvatarPeer.jsx';
import { Terrain, Box, extents } from '../World/baseElements.jsx';
// ability to fetch different types of avatars here
export const OtherAvatars = ({ peersRef, peers }) => {
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
  // send face calculations, positions through datastream with username and socket id -> changes from frame to frame
  //get face calculations from datastream

  //get unique set
  //get all peers wjere readbale:true
  //useFrame for latest updates
  // const uniquePeers = Array.from(new Set(peersRef.current));

  // console.log('uniquePeers :>> ', uniquePeers);

  const readablePeers = peersRef.current.filter((peer) => peer.peer.readable);
  console.log('readablePeers :>> ', readablePeers);
  console.log('peers in OtherAvatar :>> ', peers);
  console.log('peersRef.current :>> ', peersRef.current);
  const peersLst = peersRef.current;
  let peer = peersRef.current[0];
  //face calculations from peer sends
  return (
    <group>
      {peersLst.map((peer) => {
        <AvatarPeer
          username={peer.username}
          avatarJSON={peer.avatarJSON}
          coord={peer.coordinates}
          peer={peer.peer}
          peerID={peer.peerID}
        />;
        // <Box />;
      })}
      {/* {peer && (
        <AvatarPeer
          username={peer.username}
          avatarJSON={peer.avatarJSON}
          coord={peer.coordinates}
          peer={peers[0]}
          peerID={peer.peerID}
        />
      )} */}
    </group>
  );
};
