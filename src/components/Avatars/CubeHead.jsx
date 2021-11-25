import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const shape = new THREE.Shape();
shape.lineTo(0, 1);
shape.lineTo(1, 0);

const Head = () => {
  return (
    <>
      {' '}
      <boxGeometry args={[2, 2.5, 2]} />
      <meshStandardMaterial color="gray" />
    </>
  );
};
const Ear = () => {
  return (
    <>
      <boxGeometry args={[0.5, 2, 1]} />
      <meshStandardMaterial color="yellow" />
    </>
  );
};

const Eye = () => {
  return (
    <>
      <cylinderGeometry args={[0.25, 0.25, 0.25]} />
      <meshStandardMaterial color="blue" />
    </>
  );
};
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
      <meshBasicMaterial color="green" />
    </>
  );
};
export const CubeHead = ({ leftEyeOpening, rightEyeOpening, mouthDim }) => {
  const leftEye = useRef();
  const rightEye = useRef();
  const mouthRef = useRef();

  useFrame((state, delta) => {
    // console.log('delta :>> ', delta * 1000);

    //UPDATE EYES
    leftEye.current.scale.z = 0.3;
    rightEye.current.scale.z = 0.3;

    if (leftEyeOpening.current > 0.3) {
      leftEye.current.scale.z = 1 + leftEyeOpening.current;
    }
    if (rightEyeOpening.current > 0.3) {
      rightEye.current.scale.z = 1 + rightEyeOpening.current;
    }

    //UPDATE MOUTH
    if (mouthRef.current !== undefined) {
      const { length, topBotHeight, midBotHeight } = mouthDim.current;

      const mouthVertices = [
        // top left bottom right
        new THREE.Vector2(0, -1 * (midBotHeight - topBotHeight)), // top lip
        new THREE.Vector2(0.5 * length, 0), // left
        new THREE.Vector2(0, -1 * midBotHeight - 0.1), // bottom
        new THREE.Vector2(-0.5 * length, 0), // right
      ];
      const mouth = new THREE.Shape(mouthVertices);
      const mouthGeo = new THREE.ShapeGeometry(mouth);
      mouthRef.current.geometry = mouthGeo;
    }
  });

  return (
    <>
      <mesh>
        <Head />
      </mesh>
      <mesh position={[1.25, 1.5, 0.0]}>
        <Ear />
      </mesh>
      <mesh position={[-1.25, 1.5, 0.0]}>
        <Ear />
      </mesh>
      <mesh
        ref={rightEye}
        position={[-0.5, 0.5, 1]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[1, 1, 2]}
      >
        <Eye />
      </mesh>
      <mesh
        ref={leftEye}
        position={[0.5, 0.5, 1]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[1, 1, 2]}
      >
        <Eye />
      </mesh>
      <mesh position={[0, -0.25, 1.1]} ref={mouthRef}>
        <Mouth />
      </mesh>
    </>
  );
};
