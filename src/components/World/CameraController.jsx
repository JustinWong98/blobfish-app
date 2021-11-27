import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text, Stats } from '@react-three/drei'

const keyPressed = {};

export const CameraController = ({setCoordinates}) => {
  const { camera, gl } = useThree();

  useFrame((_, delta) => {
    console.log('camera :>> ', camera);
    // console.log('camera.position :>> ', camera.position);
    // camera.position.set(camera.position.x, 0, camera.position.z);
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
      //get these to move the character too
      // console.log('camera.position :>> ', camera.position);
      switch (key) {
        case 'w':
          camera.translateZ(-momentum);
          camera.position.set(camera.position.x, 0, camera.position.z)
          setCoordinates({
            x: camera.position.x,
            y: 0,
            z: camera.position.z + 5
          });

          break;
        case 's':
          camera.translateZ(momentum);
          camera.position.set(camera.position.x, 0, camera.position.z);
          setCoordinates({
            x: camera.position.x,
            y: 0,
            z: camera.position.z + 5
          });
          break;
        case 'd':
          camera.translateX(momentum);
          camera.position.set(camera.position.x, 0, camera.position.z);
          setCoordinates({
            x: camera.position.x,
            y: 0,
            z: camera.position.z + 5
          });
          break;
        case 'a':
          camera.translateX(-momentum);
          camera.position.set(camera.position.x, 0, camera.position.z);
          setCoordinates({
            x: camera.position.x,
            y: 0,
            z: camera.position.z + 5
          });
          break;
        default:
      }
    });
  });

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    camera.position.set(0, 0, 5);
    // for when avartar is facing others
    // camera.position.set(0, 0, -5);
    // camera.rotation.y = Math.PI;
    controls.minPolarAngle = Math.PI / 3;
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
  // console.log('keyPressed[e.key] :>> ', keyPressed[e.key]);
};

export const handleKeyUp = (e) => {
  delete keyPressed[e.key];
};
