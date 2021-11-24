import { Suspense, useRef, useState, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Blobfish } from '../components/BaseAvatars/Blobfish';
import Container from '@mui/material/Container';
// gets stream of playermotions in the world
// get stream of playerAudio in the world, join them
import * as THREE from 'three';
const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

function Box(props) {
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

const Terrain = () => {
  return (
    <mesh visible position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshBasicMaterial color="white" />
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

function World() {
  console.log('loading world');

  //redirect to a standard world with standard id for socket emits

  // decide on world dimensions

  return (
    <Canvas
      // className={'w-screen  h-screen'}
      // camera={{
      //   position: [10, 10, 10],
      // }}
      style={{ background: 'skyblue' }}
    >
      <CameraController />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <Blobfish
        // faceAngles={faceAngles}
        // leftEyeOpening={leftEyeOpening}
        // rightEyeOpening={rightEyeOpening}
        // mouthDim={mouthDim}
        />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Terrain />
      </Suspense>
      {/* The X axis is red. The Y axis is green. The Z axis is blue */}
      <axesHelper />
    </Canvas>
  );
}

export default World;
