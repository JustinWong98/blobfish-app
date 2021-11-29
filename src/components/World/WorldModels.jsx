import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Bush01 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/bush01.gltf')
  return (
    <group ref={group} position={position}dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.005']}
        position={[0, 0.35, 0]}
        scale={[5, 5, 5]}
      />
    </group>
  )
}
export const Bush02 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/bush02.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.001']}
        position={[0, 0.18, 0]}
        scale={[5, 5, 5]}
      />
    </group>
  )
}

export const Bush03 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/bush03.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.001']}
        position={[0, 0, 0]}
        scale={[5, 5, 5]}
      />
    </group>
  )
}

export const FlowerBlue = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/flowerblue01.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Material}
        position={[0, 0.17, 0]}
        rotation={[-0.3, -1.47, -0.23]}
        scale={[20, 20, 20]}
      />
    </group>
  )
}

export const FlowerCalla = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/flowercalla.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Material}
        position={[0, 0.17, 0]}
        rotation={[-0.3, -1.47, -0.23]}
        scale={[10, 10, 10]}
      />
    </group>
  )
}

export const FlowerKrokus = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/flowerKrokus01.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
       <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Material}
        position={[0, 0.33, 0]}
        rotation={[-0.3, -1.47, -0.23]}
        scale={[10, 10, 10]}
      />
    </group>
  )
}
export const Flowers01 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/flowers01.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['Material.003']}
        position={[0.03, 0.16, 0]}
        rotation={[Math.PI, -0.9, Math.PI]}
        scale={[20, 20, 20]}
      />
    </group>
  )
}
export const Flowers02 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/flowers02.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['Material.003']}
        position={[-0.02, 0.3, 0.01]}
        rotation={[-Math.PI, 0.2, -Math.PI]}
        scale={[5, 5, 5]}
      />
    </group>
  )
}
export const Flowers04 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/flowers04.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
       <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Material}
        position={[-0.01, 0.38, -0.03]}
        rotation={[-3.06, -1.21, -3]}
        scale={[10, 10, 10]}
      />
    </group>
  )
}
export const Stone01 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/stone01.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials.Material}
        scale={[10, 10, 10]}
      />
    </group>
  )
}
export const Stone02 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/stone02.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials.Material}
        scale={[10, 10, 10]}
      />
    </group>
  )
}

export const Mushroom = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/mushroom01.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.007']}
        position={[0, 0.07, 0]}
      />
    </group>
  )
}

export const Tree01 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/tree01.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.003']}
        scale={[3, 3, 3]}
      />
    </group>
  )
}

export const Tree02 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/tree02.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
          <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.003']}
        scale={[3, 3, 3]}
      />
    </group>
  )
}
export const Tree03 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/tree03.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
          <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.004']}
        scale={[3, 3, 3]}
      />
    </group>
  )
}
export const Tree04 = ({position}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/tree04.gltf')
   return (
    <group ref={group} position={position} dispose={null}>
            <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.005']}
        scale={[3, 3, 3]}
      />
    </group>
  )
}

useGLTF.preload('/models/bush01.gltf')
useGLTF.preload('/models/bush02.gltf')
useGLTF.preload('/models/bush03.gltf')
useGLTF.preload('/models/flowerblue01.gltf')
useGLTF.preload('/models/flowercalla.gltf')
useGLTF.preload('/models/flowerKrokus01.gltf')
useGLTF.preload('/models/flowers01.gltf')
useGLTF.preload('/models/flowers02.gltf')
useGLTF.preload('/models/flowers04.gltf')
useGLTF.preload('/models/stone01.gltf')
useGLTF.preload('/models/stone02.gltf')
useGLTF.preload('/models/mushroom01.gltf')
useGLTF.preload('/models/tree01.gltf')
useGLTF.preload('/models/tree02.gltf')
useGLTF.preload('/models/tree03.gltf')
useGLTF.preload('/models/tree04.gltf')