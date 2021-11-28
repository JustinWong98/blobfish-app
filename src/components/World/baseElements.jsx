import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import {Tree} from '../World/Tree.jsx'
import { useTexture } from "@react-three/drei"
import { Texture } from '@material-ui/icons';
import * as THREE from 'three'
export function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export const Terrain = () => {
    const texture = useTexture( 'grass_texture.jpg')
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(250, 250);
    }
  return (
    <mesh visible position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1500, 1500, 128, 128]} />
      <group rotation={[Math.PI/2,0,0]}>
        <Tree position={[10,0,10]}/>
        <Tree position={[5,0,5]}/>
      </group>
      <meshBasicMaterial map={texture} />
      {/* <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      /> */}
    </mesh>
  );
};
