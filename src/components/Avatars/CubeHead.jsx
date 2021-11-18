export const CubeHead = ({ faceWidth, faceHeight, faceAngles }) => {
  return (
    <>
      <mesh>
        <boxGeometry args={[2, 2.5, 2]} />
        {/* <sphereGeometry args={[2, 32, 16]} /> */}
        {/* <octahedronGeometry args={[2, 0]} /> */}
        <meshStandardMaterial color="gray" />
        {/* <meshPhongMaterial color="black" opacity={1} transparent={true} /> */}
        {/* <meshStandardMaterial color="blue" /> */}
        {/* <meshNormalMaterial color="blue" /> */}
        {/* <meshBasicMaterial color="blue" /> */}
      </mesh>
      <mesh position={[1.25, 1.5, 0.0]}>
        <boxGeometry args={[0.5, 2, 1]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[-1.25, 1.5, 0.0]}>
        <boxGeometry args={[0.5, 2, 1]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh
        position={[-0.5, 0.5, 1]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[1, 1, 2]}
      >
        <cylinderGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh
        position={[0.5, 0.5, 1]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[1, 1, 2]}
      >
        <cylinderGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, -1, 1.1]}>
        <polyhedronBufferGeometry
          args={[[0, 0, 0, 1, 1, 0, -1, 1, 0], [0, 1, 2], 0.7, 0]}
        />
        {/* <shapeBufferGeometry args={shape} /> */}
        {/* <shapeGeometry args={shape} /> */}
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
};
