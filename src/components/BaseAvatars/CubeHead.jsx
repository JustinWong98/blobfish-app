import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const shape = new THREE.Shape();
shape.lineTo(0, 1);
shape.lineTo(1, 0);

const Head = ({headHeight,
headWidth,
headLength,
headColor
}) => {
  return (
    <>
      {' '}
      <boxGeometry args={[headWidth, headHeight, headLength]} />
      <meshBasicMaterial color={headColor}/>
    </>
  );
};
const Ear = ({earLength, earColor}) => {
  return (
    <>
      <boxGeometry args={[0.5, earLength, 1]} />
      <meshBasicMaterial color={earColor} />
    </>
  );
};

const Eye = ({eyeColor, headLength}) => {
  return (
    <>
      <cylinderGeometry args={[0.25, 0.25, 0.25]} />
      <meshBasicMaterial color={eyeColor} />
    </>
  );
};
const Mouth = ({headLength}) => {
  //Mouth length is half of face by default
  const vertices = [
    new THREE.Vector2(0, -0, headLength - 2), // top lip
    new THREE.Vector2(0.5, 0), // left
    new THREE.Vector2(0, -0.5), // bottom
    new THREE.Vector2(-0.5, 0), // right
  ];
  const mouth = new THREE.Shape(vertices);

  return (
    <>
      <shapeBufferGeometry args={[mouth]} />
      <meshBasicMaterial color="green" />
    </>
  );
};
export const CubeHead = ({
headHeight,
headWidth,
headLength,
earLength,
headColor,
earColor,
eyeColor
}) => {

  return (
    <>
      <mesh>
        <Head headHeight={headHeight} headWidth={headWidth} headLength={headLength} headColor={headColor}/>
      </mesh>
      <mesh position={[1.25, 1.5, 0.0]}>
        <Ear earLength={earLength} earColor={earColor}/>
      </mesh>
      <mesh position={[-1.25, 1.5, 0.0]}>
        <Ear earLength={earLength} earColor={earColor}/>
      </mesh>
      <group position={[0,0,headLength/2]}>
        <mesh
          position={[-0.5, 0.5, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
          scale={[1, 1, 2]}
        >
          <Eye eyeColor={eyeColor}/>
        </mesh>
        <mesh
          position={[0.5, 0.5, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
          scale={[1, 1, 2]}
        >
          <Eye eyeColor={eyeColor}/>
        </mesh>
        <mesh position={[0, -0.25, 0.1]} >
          <Mouth />
        </mesh>
      </group>
    </>
  );
};
