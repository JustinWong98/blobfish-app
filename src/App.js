import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { hasLoginCookie, getCookie } from './modules/cookie.mjs';

// import { theme } from './modules/theme.mjs';

import VideoPlayer from './components/VideoPlayer.jsx';
import Notifications from './components/Notifications.jsx';
import Sidebar from './components/Sidebar.jsx';
import NavBar from './components/NavBar.jsx';

import Home from './routes/Home.jsx';
import { Front } from './routes/Front.jsx';
import SignUp from './routes/Signup';
import { Route, NavLink, BrowserRouter, Routes } from 'react-router-dom';

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   borderRadius: 15,
  //   margin: '30px 100px',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '600px',
  //   border: '2px solid black',
  //   [theme.breakpoints.down('xs')]: {
  //     width: '90%',
  //   },
  // },
  // image: {
  //   marginLeft: '15px',
  // },
  // wrapper: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   width: '100%',
  // },
}));

const theme = createTheme({
  typography: {
    fontFamily: 'Miriam Libre,sans-serif',
    fontWeightRegular: 700,
  },
  palette: {
    primary: {
      light: '#ffddc1',
      main: '#ffab91',
      dark: '#c97b63',
      contrastText: '#000000',
    },
    secondary: {
      light: '#82f7ff',
      main: '#40c4ff',
      dark: '#0094cc',
      contrastText: '#000',
    },
  },
});

function App() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(hasLoginCookie());
  const [username, setUsername] = useState(getCookie('username').trim());
  const [userId, setUserId] = useState(Number(getCookie('userId').trim()));

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/front" element={<Front />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/login" element={<Login />} />
        <Route path='/avatar' element ={<Avatar/>}/> */}

            <Route path="/" element={<Home />} />
            <Route
              path="/room/:roomID"
              element={<VideoPlayer key="videoPlayer" />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
