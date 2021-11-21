import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Blobfish = ({ faceWidth, faceHeight, faceAngles }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group ref={group} rotation={[0,4.7,0]} position={[1, 0, 1.5]}dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={nodes.Sphere.material}
        position={[0.89, 0.36, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_1.geometry}
        material={nodes.Sphere_1.material}
        position={[0.81, 0.38, 0.55]}
        scale={[0.2, 0.2, 0.2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_2.geometry}
        material={nodes.Sphere_2.material}
        position={[0, 0.43, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box.geometry}
        material={nodes.Box.material}
        position={[1.94, -0.15, -0.16]}
        rotation={[-0.15, 0, 0]}
        scale={[0.2, 0.2, 0.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_1.geometry}
        material={nodes.Box_1.material}
        position={[2.05, -0.4, -0.68]}
        rotation={[-0.66, 0, 0]}
        scale={[0.2, 0.2, 0.32]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_2.geometry}
        material={nodes.Box_2.material}
        position={[1.95, -0.24, -0.43]}
        rotation={[-0.49, 0, 0]}
        scale={[0.2, 0.2, 0.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_3.geometry}
        material={nodes.Box_3.material}
        position={[1.94, -0.11, 0.13]}
        rotation={[-0.06, 0, 0]}
        scale={[0.2, 0.2, 0.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_4.geometry}
        material={nodes.Box_4.material}
        position={[1.91, -0.12, 0.44]}
        rotation={[0.14, 0, 0]}
        scale={[0.2, 0.2, 0.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_5.geometry}
        material={nodes.Box_5.material}
        position={[1.91, -0.18, 0.72]}
        rotation={[0.28, 0, 0]}
        scale={[0.2, 0.2, 0.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_6.geometry}
        material={nodes.Box_6.material}
        position={[1.91, -0.29, 0.98]}
        rotation={[0.54, 0, 0]}
        scale={[0.2, 0.2, 0.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_7.geometry}
        material={nodes.Box_7.material}
        position={[1.91, -0.44, 1.17]}
        rotation={[0.74, 0, 0]}
        scale={[0.2, 0.2, 0.3]}
      />
    </group>
  )
}

useGLTF.preload('/scene.gltf')