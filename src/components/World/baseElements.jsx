import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Tree } from '../World/Tree.jsx';
import {
  Bush01,
  Bush02,
  Bush03,
  FlowerBlue,
  FlowerCalla,
  FlowerKrokus,
  Flowers01,
  Flowers02,
  Flowers04,
  Stone01,
  Stone02,
  Mushroom,
  Tree01,
  Tree02,
  Tree03,
  Tree04,
} from './WorldModels.jsx';
import { useTexture } from '@react-three/drei';
import { Texture } from '@material-ui/icons';
import * as THREE from 'three';
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
export const extents = 50;
export const Terrain = () => {
  const texture = useTexture('../grass_texture.jpg');
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(extents / 30, extents / 30);
  }
  return (
    <mesh visible position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry
        attach="geometry"
        args={[extents, extents, 128, 128]}
      />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Tree position={[10, 0, 10]} />
        <Tree01 position={[5, 0, -5]} />
        <Tree02 position={[-7, 0, -7]} />
        <Tree03 position={[-20, 0, -10]} />
        <Tree04 position={[19, 0, -15]} />
        <Bush01 position={[3, 0, 10]} />
        <Bush02 position={[11, 0, -10]} />
        <Bush03 position={[-8, 0, 20]} />
        <FlowerBlue position={[20, 0, 5]} />
        <FlowerCalla position={[15, 0, -2]} />
        <FlowerKrokus position={[15, 0, -20]} />
        <Flowers01 position={[0, 0, 0]} />
        <Flowers02 position={[-15, 0, 8]} />
        <Stone01 position={[10, 0, 6]} />
        <Stone02 position={[-9, 0, 15]} />
      </group>
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
