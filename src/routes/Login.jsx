import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';

import { BACKEND_URL } from '../BACKEND_URL';
import * as successes from '../modules/successes.mjs';
import * as errors from '../modules/errors.mjs';
import * as cookie from '../modules/cookie.mjs';
import Link from '@mui/material/Link';
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
function Login({ isLoggedIn, setIsLoggedIn, setUsername }) {
  const [cookies, setCookie] = useCookies(['userId', 'isLoggedIn', 'username']);
  const [globalErrorMessage, setGlobalErrorMessage] = useState('');
  const [usernameInvalidMessage, setUsernameInvalidMessage] = useState('');
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState('');

  const [username, setUserName] = useState();
  // const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    let usernameInvalid = '';
    let passwordInvalid = '';

    console.log('BACKEND_URL :>> ', BACKEND_URL);
    axios
      .post(`${BACKEND_URL}/login`, { username, password })
      .then((response) => {
        console.log('response from login :>> ', response);
        if (response.data.error) {
          window.scrollTo(0, 0);
          if (
            response.data.error === errors.LOGIN_INPUT_VALIDATION_ERROR_MESSAGE
          ) {
            if (response.data.username_invalid) {
              usernameInvalid = response.data.username_invalid;
            }

            if (response.data.password_invalid) {
              passwordInvalid = response.data.password_invalid;
            }
          }

          setUsernameInvalidMessage(usernameInvalid);
          setPasswordInvalidMessage(passwordInvalid);
          setGlobalErrorMessage(errors.LOGIN_GLOBAL_ERROR_MESSAGE);
        } else {
          console.log('setIsLoggedIn :>> ', setIsLoggedIn);
          setIsLoggedIn(true);
          setUsername(response.data.username);
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
          <Typography variant="body1" color="initial">
            Login
          </Typography>
          Don't have an account?
          <Link href="/signup" variant="body2" color="secondary">
            {'Sign up'}
          </Link>
          <Username username={username} setUserName={setUserName} />
          <Password password={password} setPassword={setPassword} />
          <div className=" flex justify-end">
            <Button
              variant="contained"
              onClick={handleClick}
              color="secondary"
              className="w-1/4 "
            >
              Login
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default Login;
