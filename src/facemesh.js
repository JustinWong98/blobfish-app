import { FaceMesh } from '@mediapipe/face_mesh';
import * as Facemesh from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import * as draw from '@mediapipe/drawing_utils';

export function getXYFromLandmark = (obj, videoRef) => {
  const x = obj.x * videoRef.current.width;
  const y = obj.y * videoRef.current.height;
  return [x, y];
};

export function onResults(results) {
  const vidWidth = videoRef.current.video.videoWidth;
  const vidHeight = videoRef.current.video.videoHeight;

  canvasRef.current.width = vidWidth;
  canvasRef.current.height = vidHeight;

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
      // console.log('landmarks :>> ', landmarks);
      // draw.drawLandmarks(canvasCtx, landmarks, { color: '#FF3030' });

      // drawPolylineFromLandMark(landmarks);

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
    }
  }
  canvasCtx.restore();
}
//USE IN SOCKET IO
useEffect(() => {
  console.log('running useeffect in video frame');
  const faceMesh = new FaceMesh({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
  });
  faceMesh.setOptions({
    // enableFaceGeometry: true,
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  faceMesh.onResults(onResults);
  if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
    const camera = new cam.Camera(videoRef.current.video, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current.video });
      },
      width: 550,
      height: 412,
    });
    camera.start();
  }
}, []);
