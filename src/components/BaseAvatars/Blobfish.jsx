
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
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

export const Blobfish = () => {
  const { nodes, materials } = useGLTF('/scene3.gltf')

  return (
    <group scale={[2.5,2.5,2.5]} position={[1,0,0]}dispose={null}>
      <group rotation={[0.17, -Math.PI / 2, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          position={[0.55, 0, 0.3]}
          scale={[0.06, 0.05, 0.06]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={nodes.Sphere_1.material}
          position={[0.55, 0, -0.3]}
          scale={[0.06, 0.05, 0.06]}
        />
        <mesh position={[0.97, -0.22, 0]}
          rotation={[-Math.PI / 2, Math.PI / 6, -Math.PI / 2]}>
          <Mouth/>
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
  )
}

useGLTF.preload('/scene3.gltf')
