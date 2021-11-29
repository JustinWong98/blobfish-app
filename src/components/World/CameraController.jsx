import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const keyPressed = {};

export const CameraController = ({ coordinates }) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(12, 12, 20);
    camera.lookAt(0, 0, 0);
  }, [camera, gl]);
  return null;
};
