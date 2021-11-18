import React from 'react';
import { render } from 'react-dom';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from '../components/VideoPlayer.jsx';
import Notifications from '../components/Notifications.jsx';
import Sidebar from '../components/Sidebar.jsx'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h2" align="center">
          {' '}
          Blobfish Chat
        </Typography>
      </AppBar>
      {/* <VideoPlayer /> */}
      <Sidebar />
    </div>
  );
}

export default Home;
