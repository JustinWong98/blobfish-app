import React, {useState, useRef, Suspense} from 'react'
import { CubeHead } from './CubeHead'
import { Blobfish } from './Blobfish'
import { Canvas, useFrame } from '@react-three/fiber';
import { Slider } from '@mui/material';


export const AvatarMaker = ({
  xAxis,
  yAxis,
  zAxis,
  size,
  avatar,
  headHeight,
  headWidth,
  headLength,
  earLength,
  headColor,
  earColor,
  eyeColor
}) => {
  //  const [CurrentAvatar, setCurrentAvatar] = useState()
  const avatarRef = useRef()
  //  setCurrentAvatar(Avatars.Blobfish)
    // rotate horizontally
    useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    try{
      avatarRef.current.rotation.y = a;
    }
    catch (err) {
      console.log('err', err)
    }
  });

  function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  )
}
  return (
    <>
    <group ref={avatarRef}>
      <Suspense fallback = {<Box />}>
        {avatar === 'Blobfish' && <Blobfish xAxis={xAxis} yAxis={yAxis} zAxis={zAxis} size={size}/>}
        {avatar === 'CubeHead' && <CubeHead headHeight={headHeight} headWidth={headWidth} headLength={headLength} earLength={earLength} headColor={headColor} earColor={earColor} eyeColor={eyeColor}/>}
      </Suspense>
    </group>
    </>
  )
}

export default AvatarMaker
