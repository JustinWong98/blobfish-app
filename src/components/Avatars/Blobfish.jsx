// // for eye closing, x pos moves back by 0.004 for every 0.001 of z

// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber';

// export const Blobfish = ({ faceWidth,
//   faceHeight,
//   faceAngles,
//   leftEyeOpening,
//   rightEyeOpening,
//   mouthDim,}) => {
//   const group = useRef()
//   const leftEye = useRef()
//   const rightEye = useRef()
//   const mouth = useRef()
//   const { nodes, materials } = useGLTF('/scene.gltf')

//   useFrame((state, delta) => {
//     // leftEye.current.position.x = 0.7;
//     // rightEye.current.position.x = 0.7;
//     // console.log(leftEyeOpening.current)
//     // if (leftEyeOpening.current > 0.3) {
//     //   leftEye.current.position.x = 1 ;
//     // }
//     // if (rightEyeOpening.current > 0.3) {
//     //   rightEye.current.position.x = 1;
//     // }
//   })

//   return (
// <group ref={group} dispose={null}>
//       <group position={[0, 0, 0]} rotation={[0, -1.42, 0]} scale={[1, 0.62, 1]}>
// <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cylinder.geometry}
//           material={nodes.Cylinder.material}
//           position={[0, 0, 0.01]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Sphere.geometry}
//           material={nodes.Sphere.material}
//           position={[1.1, 0.4, -0.2]}
//           scale={[0.2, 0.2, 0.2]}
//           ref={leftEye}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Sphere_1.geometry}
//           material={nodes.Sphere_1.material}
//           position={[1, 0.4, 0.5]}
//           scale={[0.2, 0.2, 0.2]}
//           ref={rightEye}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Ring.geometry}
//           material={nodes.Ring.material}
//           position={[2.07, -0.243, 0.29]}
//           rotation={[-1.48, 0.57, 1.38]}
//           scale={[1.34, 0.62, 1.02]}
//           ref={mouth}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Circle.geometry}
//           material={nodes.Circle.material}
//           position={[0.7, 0.16, -1.37]}
//           rotation={[-2.12, 0.13, 1.99]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Circle_1.geometry}
//           material={nodes.Circle_1.material}
//           position={[0.24, 0.08, 1.67]}
//           rotation={[2.21, 0.03, 2.41]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Sphere_2.geometry}
//           material={nodes.Sphere_2.material}
//           position={[0, 0.5, 0]}
//         />
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('/scene.gltf')

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Mouth = ({ mouthRef }) => {
  //Mouth length is half of face by default
  const vertices = [
    new THREE.Vector2(0, -0), // top lip
    new THREE.Vector2(0.5, 0), // left
    new THREE.Vector2(0, -0.5), // bottom
    new THREE.Vector2(-0.5, 0), // right
  ];
  const mouth = new THREE.Shape(vertices);

  return (
    <>
      <shapeBufferGeometry args={[mouth]} />
      <meshBasicMaterial color="maroon" />
    </>
  );
};

export const Blobfish = ({ faceCalculations,
  xAxis,
  yAxis,
  zAxis,
  size }) => {
  console.log('running in blobfish');

  const group = useRef();
  const leftEye = useRef();
  const rightEye = useRef();
  const mouth = useRef();
  const { nodes, materials } = useGLTF('/scene3.gltf');
  useFrame((state, delta) => {
    const { leftEyeOpening, rightEyeOpening, mouthDim } =
      faceCalculations.current;
    leftEye.current.position.x = 0.44;
    rightEye.current.position.x = 0.44;
    // console.log(leftEyeOpening.current)
    if (leftEyeOpening > 0.3) {
      leftEye.current.position.x = 0.5;
    }
    if (rightEyeOpening > 0.3) {
      rightEye.current.position.x = 0.5;
    }
    const { length, topBotHeight } = mouthDim;
    const mouthVertices = [
      // top left bottom right
      new THREE.Vector2(0, -0.15 + topBotHeight * 0.3), // top lip
      new THREE.Vector2(0.5 * length, 0), // left
      new THREE.Vector2(0, -0.25), // bottom
      new THREE.Vector2(-0.5 * length, 0), // right
    ];
    const mouthShape = new THREE.Shape(mouthVertices);
    const mouthGeo = new THREE.ShapeGeometry(mouthShape);
    mouth.current.geometry = mouthGeo;
  });
  return (
    <group
      ref={group}
      scale={[xAxis,yAxis,zAxis]}
      position={[0, 0, 0]}
      dispose={null}
    >
      <group rotation={[0.17, -Math.PI / 2, 0]} scale={[size, size, size]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          position={[0.55, 0, 0.3]}
          scale={[0.06, 0.05, 0.06]}
          ref={rightEye}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={nodes.Sphere_1.material}
          position={[0.55, 0, -0.3]}
          scale={[0.06, 0.05, 0.06]}
          ref={leftEye}
        />
        <mesh
          ref={mouth}
          position={[0.97, -0.22, 0]}
          rotation={[-Math.PI / 2, Math.PI / 6, -Math.PI / 2]}
        >
          <Mouth />
        </mesh>
        {/* <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ring.geometry}
          material={nodes.Ring.material}
          position={[0.97, -0.22, 0]}
          rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]}
          scale={[0.5, 0.25, 0.5]}
          innerRadius={1}
          ref={mouth}
        /> */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={nodes.Sphere_2.material}
          position={[0, 0.02, 0]}
          scale={[0.6, 0.25, 0.5]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          position={[0, -0.12, 0]}
          rotation={[0, 0, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_3.geometry}
          material={nodes.Sphere_3.material}
          position={[0.35, 0, 0]}
          rotation={[0, 0, 2.97]}
          scale={[0.4, 0.2, 0.2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={nodes.Circle.material}
          position={[0.2, -0.1, 0.64]}
          rotation={[1.92, -0.47, 1.19]}
          scale={[0.4, 0.4, 0.4]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_1.geometry}
          material={nodes.Circle_1.material}
          position={[0.2, -0.1, -0.64]}
          rotation={[-1.81, 0.38, 1.16]}
          scale={[0.4, 0.4, 0.4]}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/scene3.gltf');
