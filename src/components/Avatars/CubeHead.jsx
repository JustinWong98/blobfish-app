import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const shape = new THREE.Shape();
shape.lineTo(0, 1);
shape.lineTo(1, 0);

const Head = ({headHeight, headWidth, headLength, headColor}) => {
  return (
    <>
      {' '}
      <boxGeometry args={[headWidth, headHeight, headLength]} />
      <meshStandardMaterial color={headColor} />
    </>
  );
};
const Ear = ({earLength, earColor}) => {
  return (
    <>
      <boxGeometry args={[0.5, earLength, 1]} />
      <meshStandardMaterial color={earColor} />
    </>
  );
};

const Eye = ({eyeColor}) => {
  return (
    <>
      <cylinderGeometry args={[0.25, 0.25, 0.25]} />
      <meshStandardMaterial color={eyeColor} />
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
export const CubeHead = ({ faceCalculations,
headHeight,
headWidth,
headLength,
earLength,
headColor,
earColor,
eyeColor }) => {
  const leftEye = useRef();
  const rightEye = useRef();
  const mouthRef = useRef();

  useFrame((state, delta) => {
    // console.log('delta :>> ', delta * 1000);
const { leftEyeOpening, rightEyeOpening, mouthDim } =
      faceCalculations.current;
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
      const { length, topBotHeight, midBotHeight } = mouthDim;

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
          ref={rightEye}
          position={[-0.5, 0.5, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
          scale={[1, 1, 2]}
        >
          <Eye eyeColor={eyeColor}/>
        </mesh>
        <mesh
          ref={leftEye}
          position={[0.5, 0.5, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
          scale={[1, 1, 2]}
        >
          <Eye eyeColor={eyeColor}/>
        </mesh>
        <mesh position={[0, -0.25, 0.1]} ref={mouthRef}>
          <Mouth />
        </mesh>
      </group>
    </>
  );
};
