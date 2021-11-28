import './App.css';
import React, { useState, createContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { hasLoginCookie, getCookie } from './modules/cookie.mjs';
import { SocketContext, socket } from './components/context/sockets.js';
// import { theme } from './modules/theme.mjs';

import Room from './routes/Room.jsx';
import NavBar from './components/NavBar.jsx';

import AvatarEditor from './routes/AvatarEditor.jsx';
import { Front } from './routes/Front.jsx';
import SignUp from './routes/Signup';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { Route, NavLink, BrowserRouter, Routes } from 'react-router-dom';
import World from './routes/World';

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

export const AvatarJSONContext = createContext();
function App() {
  const useStyles = makeStyles();
  const classes = useStyles(theme);
  const [avatarJSON, setAvatarJSON] = useState({
    model: 'CubeHead',
    headHeight: 2.5,
    headWidth: 2,
    headLength: 2,
    earLength: 2,
    headColor: '#00d084',
    earColor: '#fcb900',
    eyeColor: '#fcb900',
  });
  // const [avatarJSON, setAvatarJSON] = useState('Blobfish');
  const [isLoggedIn, setIsLoggedIn] = useState(hasLoginCookie());
  const [username, setUsername] = useState(getCookie('username').trim());
  const [userId, setUserId] = useState(Number(getCookie('userId').trim()));
  const [avatarModel, setAvatar] = useState({
    name: 'Robo',
  });

  console.log('setIsLoggedIn :>> ', setIsLoggedIn);
  return (
    <SocketContext.Provider value={socket}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <AvatarJSONContext.Provider value={{ avatarJSON, setAvatarJSON }}>
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
                <Route path="/avatar" element={<AvatarEditor />} />
                <Route
                  path="/world/:worldID"
                  // path="/world/:roomID"
                  // element={<Room key="videoPlayer" username={username} />}
                  element={
                    <World avatarJSON={avatarJSON} username={username} />
                  }
                />
                <Route
                  path="/room/:roomID"
                  element={<Room key="videoPlayer" username={username} />}
                />
                <Route
                  path="/:worldID"
                  element={
                    <World avatarJSON={avatarJSON} username={username} />
                  }
                />
                <Route
                  path="/"
                  element={
                    <World avatarJSON={avatarJSON} username={username} />
                  }
                />
              </Routes>
            </BrowserRouter>
          </AvatarJSONContext.Provider>
        </ThemeProvider>
      </CookiesProvider>
    </SocketContext.Provider>
  );
}

export default App;
