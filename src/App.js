import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from 'react-dom';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from './components/VideoPlayer.jsx';
import Notifications from './components/Notifications.jsx';
import Sidebar from './components/Sidebar.jsx';
import Home from './routes/Home.jsx';
import { Route, NavLink, BrowserRouter, Routes } from 'react-router-dom';
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

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/room/:roomID"
          element={<VideoPlayer key="videoPlayer" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
