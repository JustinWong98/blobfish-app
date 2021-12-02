import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import { BACKEND_URL } from '../BACKEND_URL';
import * as successes from '../modules/successes.mjs';
import * as errors from '../modules/errors.mjs';
import * as cookie from '../modules/cookie.mjs';
import { Typography } from '@mui/material';

const Username = ({ username, setUserName }) => {
  return (
    <TextField
      required
      id="filled-required"
      label="Username"
      placeholder="blobfish"
      defaultValue=""
      value={username}
      variant="filled"
      onChange={(e) => setUserName(e.target.value)}
    />
  );
};
const Email = ({ email, setEmail }) => {
  return (
    <TextField
      id="filled-required"
      label="Email"
      type="email"
      placeholder="fish@blob.com"
      defaultValue=""
      variant="filled"
      onChange={(e) => setEmail(e.target.value)}
    />
  );
};
const Password = ({ password, setPassword }) => {
  return (
    <TextField
      id="filled-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
      variant="filled"
      onChange={(e) => setPassword(e.target.value)}
    />
  );
};
function SignUp({ isLoggedIn, setIsLoggedIn, setUsername }) {
  console.log(BACKEND_URL)
  const [cookies, setCookie] = useCookies(['userId', 'isLoggedIn', 'username']);
  const [globalErrorMessage, setGlobalErrorMessage] = useState('');
  const [usernameInvalidMessage, setUsernameInvalidMessage] = useState('');
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState('');

  const [username, setUserName] = useState();
  // const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorOpen, setErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    let usernameInvalid = '';
    let passwordInvalid = '';
    if (password.length < 8) {
        setErrorMessage('Your password needs to be at least 8 characters long!')
        setErrorOpen(true)    
      return
    }
    axios
      .post(`${BACKEND_URL}/signup`, { username, password })
      .then((response) => {
        console.log('response from signup :>> ', response);
        if (response.data.error) {
          window.scrollTo(0, 0);
          if (
            response.data.error
          ) {
            setErrorMessage(response.data.error);
            setErrorOpen(true)   
          }
        } else {
          console.log('setIsLoggedIn :>> ', setIsLoggedIn);
          setUsername(response.data.username);
          setIsLoggedIn(true);
          setCookie('username', response.data.username, { path: '/' });
          setCookie('userId', response.data.id, { path: '/' });
          setCookie('isLoggedIn', response.data.hashedId, { path: '/' });
          navigate('/dashboard');
        }
      })
      .catch((e) => {
        // handle error
        window.scrollTo(0, 0);
        setGlobalErrorMessage(errors.LOGIN_GLOBAL_ERROR_MESSAGE);
        console.log('error in signup', e);
      });
    //check if username and email exists in the database
    // if yes, textfields invalid
    // if no, navigate to a user's home page, set cookies
  };

  return (
    <>
      <Container maxWidth="sm" className="border-2 p-8 m-4 rounded-md">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 2, mb: 2 },
            display: 'flex',
            flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
        >
          <Collapse in={errorOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setErrorOpen(false);
              }}
              severity="error"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Alert>
      </Collapse>
          <Typography variant="body1" color="initial">
            Sign up
          </Typography>
          <Username username={username} setUserName={setUserName} />
          {/* <Email email={email} setEmail={setEmail} /> */}
          <Password password={password} setPassword={setPassword} />
          <div className=" flex justify-end">
            <Button
              variant="contained"
              onClick={handleClick}
              color="secondary"
              className="w-1/4 "
            >
              Sign up
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;
