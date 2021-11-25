import { calculateFaceAngle } from './angles.mjs';
import {
  leftEyeOpenRatio,
  rightEyeOpenRatio,
  normMouthDimensions,
} from '../utils_3d.mjs';

import * as Facemesh from '@mediapipe/face_mesh';
import * as draw from '@mediapipe/drawing_utils';

const drawConnectors = draw.drawConnectors;

const drawMeshConnectors = (canvasCtx, landmarks) => {
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
    color: '#C0C0C070',
    lineWidth: 1,
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
    color: '#FF3030',
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
    color: '#FF3030',
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {
    color: '#FF3030',
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
    color: '#30FF30',
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
    color: '#30FF30',
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {
    color: '#30FF30',
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
    color: '#E0E0E0',
  });
  drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
    color: '#E0E0E0',
  });
};

const matchCanvasDimToVid = (videoRef, canvasRef) => {
  canvasRef.current.width = videoRef.current.videoWidth;
  canvasRef.current.height = videoRef.current.videoHeight;
};

const faceCalculator = (landmarks, vidWidth, vidHeight) => {
  const { angle, matrix } = calculateFaceAngle(landmarks, [
    vidWidth,
    vidHeight,
  ]);
  const leftEyeOpening = leftEyeOpenRatio(landmarks, vidWidth, vidHeight);
  const rightEyeOpening = rightEyeOpenRatio(landmarks, vidWidth, vidHeight);
  const mouthDim = normMouthDimensions(landmarks, vidWidth, vidHeight);
  return { angle, leftEyeOpening, rightEyeOpening, mouthDim };
};

function onResults(results, videoRef, canvasRef, faceCalculations) {
  const vidWidth = videoRef.current.videoWidth;
  const vidHeight = videoRef.current.videoHeight;
  matchCanvasDimToVid(videoRef, canvasRef);
  const canvasElement = canvasRef.current;
  const canvasCtx = canvasElement.getContext('2d');
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      faceCalculations.current = faceCalculator(landmarks, vidWidth, vidHeight);
      drawMeshConnectors(canvasCtx, landmarks);
    }
  }
  canvasCtx.restore();
}

export const onFaceMeshResult = (
  results,
  videoRef,
  canvasRef,
  setFaceMeshStart,
  faceCalculations
) => {
  setFaceMeshStart(true);
  onResults(results, videoRef, canvasRef, faceCalculations);
};
