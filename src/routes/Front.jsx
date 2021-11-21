import { useRef, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { VideoFrame } from '../components/VideoElements.jsx';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    height: '412px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
      heigth: '225px',
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

const LoginButton = () => {
  const useStyles = makeStyles((theme) => ({
    button: { backgroundColor: theme.palette.secondary.dark },
  }));
  const navigate = useNavigate();
  const handleClick = (e) => {
    let path = '/login';
    // let path = '/signup';
    navigate(path);
  };
  return (
    <Button variant="outlined" color="secondary" onClick={handleClick}>
      Login
    </Button>
  );
};
const SignUpButton = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    let path = '/signup';
    navigate(path);
  };

  return (
    <Button variant="contained" onClick={handleClick} color="secondary">
      Sign up
    </Button>
  );
};

export const Front = () => {
  const [name, setName] = useState('blob fish');

  const myVideo = useRef();
  const myVideoModified = useRef();
  const threeCanvasRef = useRef();
  const classes = useStyles();
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
    // <Container =
    <div>
      <Container maxWidth="md" className>
        <VideoFrame
          key="videoFrame"
          name={'Welcome to blobfish chat'}
          videoRef={myVideo}
          canvasRef={myVideoModified}
          threeCanvasRef={threeCanvasRef}
          styles={classes}
          videoIsSet={videoIsSet}
        />

        <div className=" flex m-4 justify-around	">
          <LoginButton className="mx-8" />
          <SignUpButton className="mx-8" />
        </div>
      </Container>
      {/* <Grid container className={classes.gridContainer}>
      </Grid> */}
    </div>
  );
};
