import './App.css';
import React, { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { hasLoginCookie, getCookie } from './modules/cookie.mjs';

// import { theme } from './modules/theme.mjs';

import Room from './components/Dashboard/Room.jsx';
import NavBar from './components/NavBar.jsx';

import Home from './routes/Home.jsx';
import { Front } from './routes/Front.jsx';
import SignUp from './routes/Signup';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { Route, NavLink, BrowserRouter, Routes } from 'react-router-dom';

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

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
  const useStyles = makeStyles();
  const classes = useStyles(theme);
  const [isLoggedIn, setIsLoggedIn] = useState(hasLoginCookie());
  const [username, setUsername] = useState(getCookie('username').trim());
  const [userId, setUserId] = useState(Number(getCookie('userId').trim()));
  const [avatarModel, setAvatar] = useState({
    name: 'Robo',
  });

  console.log('setIsLoggedIn :>> ', setIsLoggedIn);
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/front" element={<Front />} />
            <Route
              path="/signup"
              element={
                <SignUp
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  isLoggedIn={isLoggedIn}
                  username={username}
                  userId={userId}
                  avatarModel={avatarModel}
                  setAvatar={setAvatar}
                />
              }
            />
            {/* <Route path='/avatar' element ={<Avatar/>}/> */}

            <Route path="/" element={<Home />} />
            <Route
              path="/room/:roomID"
              element={<Room key="videoPlayer" username={username} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
