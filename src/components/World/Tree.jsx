import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export const Tree = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Tree.gltf')
  // nodes.tree_collider.material.type = MeshBasicMaterial
  return (
    <group ref={group} dispose={null} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree_collider.geometry}
        material={nodes.tree_collider.material}
        position={[-0.7, 0.32, 0]}
        scale={[0.29, 0.29, 0.29]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree.geometry}
        material={materials['Material.001']}
        position={[-0.11, 0.39, 0]}
        scale={[0.29, 0.29, 0.29]}
      />
    </group>
  )
}

useGLTF.preload('/Tree.gltf')
