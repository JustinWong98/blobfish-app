import React, {useState, useRef} from 'react'
import { CubeHead } from './Avatars/CubeHead'
import { Blobfish } from './BaseAvatars/Blobfish'
import { Canvas, useFrame } from '@react-three/fiber';
import { Slider } from '@mui/material';


export const AvatarMaker = () => {
  //  const [CurrentAvatar, setCurrentAvatar] = useState()
   const Avatars = {
     Blobfish,
     CubeHead
   }
  const threeCanvasRef = useRef()
  //  setCurrentAvatar(Avatars.Blobfish)
    // rotate horizontally
    useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    threeCanvasRef.current.rotation.y = a;
  });
  return (
    <>
      {/* {Map out each avatar} */}
      <Canvas ref={threeCanvasRef}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <Blobfish
        />
      </Canvas>
    {/* set controls for modification */}
    <Slider defaultValue={1} min={0.1} max={5} aria-label="x scale modifier" />
    <Slider defaultValue={1} min={0.1} max={5} aria-label="y scale modifier" />
    <Slider defaultValue={1} min={0.1} max={5} aria-label="z scale modifier" />
    <Slider defaultValue={1} min={0.1} max={5} aria-label="all scale modifier" />
    {/* allow them to set colors of body? */}
    </>
  )
}

export default AvatarMaker
