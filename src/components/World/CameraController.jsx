import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text, Stats } from '@react-three/drei';
import * as THREE from 'three';
import { PlayerController } from './PlayerController.jsx';

const keyPressed = {};

export const CameraController = ({ coordinates }) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(25, 0, 25);
    camera.rotation.set(Math.PI/2, Math.PI/4, 0)
  }, [camera, gl]);
  return null;
};