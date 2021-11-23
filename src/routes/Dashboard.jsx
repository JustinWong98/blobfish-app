import { useRef, useEffect, useState } from 'react';
import { VideoFrame } from '../components/VideoElements';
import { Typography, Container, Box, Grid } from '@mui/material';
import CreateRoom from './CreateRoom';
import RoomList from '../components/RoomsList';

function Dashboard({ isLoggedIn, username }) {
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
      <Container maxWidth="lg" className="border-2 p-8 m-4 rounded-md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" color="initial">
              {username}'s video chat
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
          <Grid item xs={12} md={8} lg={6}>
            <Typography variant="h5" color="initial">
              New room
            </Typography>
            <CreateRoom username={username} />
            <Typography variant="h5" color="initial">
              Rooms
            </Typography>
            <RoomList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Dashboard;
