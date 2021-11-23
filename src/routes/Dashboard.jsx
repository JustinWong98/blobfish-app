import { useRef, useEffect, useState } from 'react';
import { VideoFrame } from '../components/VideoElements';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, Box, Grid } from '@mui/material';

function Dashboard() {
  const myVideo = useRef();
  const myVideoModified = useRef();
  const threeCanvasRef = useRef();
  // const classes = useStyles();
  const stream = useRef();
  const [videoIsSet, setVideo] = useState(false);

  useEffect(() => {
    console.log('use effect in videoPlayer');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = currentStream;

        myVideo.current.srcObject = currentStream;
        setVideo(true);
        console.log('suceeded in getting video stream');
      })
      .catch((err) => {
        console.log('error in getting stream', err);
      });
  }, [myVideo]);

  return (
    <>
      {/* <Container maxWidth="lg" className="border-2 p-8 m-4 rounded-md"> */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="body1" color="initial">
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <VideoFrame
            key="videoFrame"
            name={''}
            videoRef={myVideo}
            canvasRef={myVideoModified}
            threeCanvasRef={threeCanvasRef}
            // styles={classes}
            videoIsSet={videoIsSet}
          />
        </Grid>
      </Grid>

      {/* <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 2, mb: 2 },
            display: 'flex',
            flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
        > */}
      {/* </Box> */}
      {/* </Container> */}
    </>
  );
}
export default Dashboard;
