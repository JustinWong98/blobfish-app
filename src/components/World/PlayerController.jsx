import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text, Stats } from '@react-three/drei';
import * as THREE from 'three';

const keyPressed = {};
export const PlayerController = ({ coordinates }) => {
  const { camera, gl } = useThree();
  useFrame((_, delta) => {
    // console.log('camera :>> ', camera);
    // console.log('camera.position :>> ', camera.position);
    // camera.position.set(camera.position.x, 0, camera.position.z);
    // move camera according to key pressed
    Object.entries(keyPressed).forEach((e) => {
      const [key, start] = e;
      const duration = new Date().getTime() - start;

      // increase momentum if key pressed longer
      // let momentum = Math.sqrt(duration + 200) * 0.01 + 0.05;
      let momentum = 0.25;

      // adjust for actual time passed
      momentum = (momentum * delta) / 0.016;

      // increase momentum if camera higher
      // momentum = momentum + camera.position.z * 0.02;
      //get these to move the character too
      // console.log('camera.position :>> ', camera.position);
      console.log('coordinates.current before :>> ', coordinates.current);
      switch (key) {
        case 'a':
          coordinates.current.x = coordinates.current.x - momentum;
          break;
        // camera.translateX(-momentum);
        case 'w':
          coordinates.current.z = coordinates.current.z + momentum;
          break;
        case 's':
          coordinates.current.z = coordinates.current.z - momentum;
          break;
        case 'd':
          coordinates.current.x = coordinates.current.x + momentum;
          // camera.translateX(momentum);
          break;

        default:
      }
      console.log('coordinates.current after :>> ', coordinates.current);
    });
  });

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
