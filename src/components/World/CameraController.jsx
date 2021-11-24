import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const keyPressed = {};

export const CameraController = () => {
  const { camera, gl } = useThree();
  useFrame((_, delta) => {
    // move camera according to key pressed
    Object.entries(keyPressed).forEach((e) => {
      const [key, start] = e;
      const duration = new Date().getTime() - start;

      // increase momentum if key pressed longer
      let momentum = Math.sqrt(duration + 200) * 0.01 + 0.05;

      // adjust for actual time passed
      momentum = (momentum * delta) / 0.016;

      // increase momentum if camera higher
      momentum = momentum + camera.position.z * 0.02;
      //set condition that camera position cannot be below the floor
      switch (key) {
        case 'w':
          camera.translateZ(-momentum);
          break;
        case 's':
          camera.translateZ(momentum);
          break;
        case 'd':
          camera.translateX(momentum);
          break;
        case 'a':
          camera.translateX(-momentum);
          break;
        default:
      }
    });
  });

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export const handleKeyDown = (e) => {
  if (!keyPressed[e.key]) {
    keyPressed[e.key] = new Date().getTime();
  }
  console.log('keyPressed[e.key] :>> ', keyPressed[e.key]);
};

export const handleKeyUp = (e) => {
  delete keyPressed[e.key];
};
