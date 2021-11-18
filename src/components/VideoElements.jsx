import React, { useContext, useRef, useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';

import { FaceMesh } from '@mediapipe/face_mesh';
import * as Facemesh from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import * as draw from '@mediapipe/drawing_utils';

const drawConnectors = draw.drawConnectors;
export const Canvas = ({ canvasRef, styles }) => {
  return (
    <canvas
      ref={canvasRef}
      className={styles.video}
      style={{
        zindex: 10,
      }}
    ></canvas>
  );
};
export const VideoFrame = ({
  name,
  userStream,
  videoRef,
  canvasRef,
  styles,
}) => {
  function onResults(results) {
    const vidWidth = videoRef.current.videoWidth;
    const vidHeight = videoRef.current.videoHeight;

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

  useEffect(() => {
    console.log('useEffect running in vid frame');
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);
    console.log('videoRef.current :>> ', videoRef.current);
    if (
      typeof videoRef.current.srcObject !== 'undefined' &&
      videoRef.current.srcObject !== null
    ) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 550,
        height: 412,
      });
      camera.start();
    }
  });

  return (
    <Paper className={styles.paper} key="self">
      <Typography variant="h5" gutterBottom>
        {name || ''}
      </Typography>

      <Grid item xs={12} md={12}>
        <video
          playsInline
          ref={videoRef}
          autoPlay
          muted
          className={styles.video}
          style={{ display: 'none' }}
        />
        <Canvas canvasRef={canvasRef} styles={styles} />
      </Grid>
    </Paper>
  );
};

export const OtherVideoFrame = ({ styles, videoRef, name }) => {
  return (
    <Paper className={styles.paper} key="other">
      <Typography variant="h5" gutterBottom>
        {name || ''}
      </Typography>
      <Grid item xs={12} md={12}>
        <video playsInline ref={videoRef} autoPlay className={styles.video} />
      </Grid>
    </Paper>
  );
};
