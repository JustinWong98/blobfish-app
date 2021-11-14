import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext.js';
import { FaceMesh } from '@mediapipe/face_mesh';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

// function onResults(results) {
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(
//     results.image,
//     0,
//     0,
//     canvasElement.width,
//     canvasElement.height
//   );
//   // console.log('results.multiFaceGeometry :>> ', results.multiFaceGeometry);
//   if (results.multiFaceLandmarks) {
//     for (const landmarks of results.multiFaceLandmarks) {
//       // drawLandmarks(canvasCtx, landmarks, { color: '#FF3030' });

//       drawPolylineFromLandMark(landmarks);

//       // console.log('landmarks :>> ', landmarks);
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
//       //   color: '#C0C0C070',
//       //   lineWidth: 1,
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
//       //   color: '#FF3030',
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {
//       //   color: '#FF3030',
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {
//       //   color: '#FF3030',
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
//       //   color: '#30FF30',
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {
//       //   color: '#30FF30',
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {
//       //   color: '#30FF30',
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
//       //   color: '#E0E0E0',
//       // });
//       // drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, { color: '#E0E0E0' });
//     }
//   }
//   canvasCtx.restore();
// }

function VideoPlayer() {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const classes = useStyles();

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
  // faceMesh.onResults(onResults);

  const VideoFrame = ({ videoRef }) => {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {name || ''}
        </Typography>
        <Grid item xs={12} md={12}>
          <video
            playsInline
            muted
            ref={videoRef}
            autoPlay
            className={classes.video}
          />
        </Grid>
      </Paper>
    );
  };

  return (
    <div>
      <Grid container className={classes.gridContainer}>
        {stream && <VideoFrame videoRef={myVideo} />}
        {callAccepted && !callEnded && <VideoFrame videoRef={userVideo} />}
      </Grid>
    </div>
  );
}

export default VideoPlayer;
