import React, { useRef, useEffect, useState, useContext } from 'react';
import { VideoFrame } from '../components/VideoElements';
import { Typography, Container, Box, Grid } from '@mui/material';
import RoomRepo from '../components/Dashboard/RoomRepo';
import AvatarPanel from '../components/Dashboard/AvatarPanel';
import { getWebCamStream } from '../modules/webcam.jsx';
import { AvatarJSONContext } from '../App';

function Dashboard({ isLoggedIn, username, userId, avatarModel, setAvatar }) {
  const myVideo = useRef();
  const myVideoModified = useRef();
  const threeCanvasRef = useRef();
  const stream = useRef();
  const [videoIsSet, setVideo] = useState(false);
  const {avatarJSON, setAvatarJSON } = useContext(AvatarJSONContext)
  // to update with default config, etc

  useEffect(() => {
    console.log('use effect in videoPlayer');
    getWebCamStream(stream, myVideo, setVideo);
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
              videoIsSet={videoIsSet}
              avatarModel={avatarModel}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <RoomRepo username={username} />
            <AvatarPanel
              userId={userId}
              avatarModel={avatarModel}
              setAvatar={setAvatar}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Dashboard;
