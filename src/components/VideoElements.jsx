import React, { useContext, useRef, useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { videoStyles } from '../modules/useStyles.jsx';
import { ThreeCanvas } from './Avatar';
import { AvatarJSONContext } from '../App.js';

import { FaceMesh } from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';

import { onResultCalFaceCanvas, faceMeshSetup } from './face/facemesh.jsx';

export const VidCanvas = ({ canvasRef, styles }) => {
  return <canvas ref={canvasRef} className={styles.video}></canvas>;
};

export const VideoFrame = ({
  name,
  videoRef,
  canvasRef,
  videoIsSet,
  threeCanvasRef,
}) => {
  const {avatarJSON, setAvatarJSON} = useContext(AvatarJSONContext)
  const [faceMeshStarted, setFaceMeshStart] = useState(false);
  const styles = videoStyles();
  const faceCalculations = useRef({
    faceAngle: {
      pitch: 0,
      roll: 0,
      yaw: 0,
    },
    leftEyeOpening: 1,
    rightEyeOpening: 1,
    mouthDim: {
      mouthLen: 0,
      mouthMidBot: 0,
      mouthTopBot: 0,
    },
  });

  useEffect(() => {
    console.log('useEffect running in vid frame');
    const faceMesh = faceMeshSetup();
    faceMesh.onResults((results) => {
      onResultCalFaceCanvas(
        results,
        videoRef,
        canvasRef,
        setFaceMeshStart,
        faceCalculations
      );
    });
    if (
      typeof videoRef.current.srcObject !== 'undefined' &&
      videoRef.current.srcObject !== null
    ) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
      });
      camera.start();
    }
  });

  return (
    <Grid item xs={12} md={12}>
      <Paper className={styles.paper} key="self">
        <video
          playsInline
          ref={videoRef}
          autoPlay
          muted
          className={styles.video}
          style={{ display: 'none' }}
        />
        {videoIsSet && <VidCanvas canvasRef={canvasRef} styles={styles} />}
        {faceMeshStarted && (
          <ThreeCanvas
            threeCanvasRef={threeCanvasRef}
            styles={styles}
            faceCalculations={faceCalculations}
            className={'align-middle'}
            avatarJSON={avatarJSON}
            setAvatarJSON={setAvatarJSON}
          />
        )}
        <Typography variant="h5" gutterBottom className="text-center">
          {name || ''}
        </Typography>
      </Paper>
    </Grid>
  );
};

export const OtherVideoFrame = ({ videoRef, name }) => {
  const styles = videoStyles();
  return (
    <Paper className={styles.paper} key="other">
      <Grid item xs={12} md={12} className={'m-2'}>
        <video playsInline ref={videoRef} autoPlay className={styles.video} />
      </Grid>
      <Typography variant="h5" gutterBottom>
        {name || ''}
      </Typography>
    </Paper>
  );
};
