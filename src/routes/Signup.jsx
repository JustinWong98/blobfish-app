import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const Username = () => {
  return (
    <TextField
      required
      id="filled-required"
      label="Username"
      placeholder="blobfish"
      defaultValue=""
      variant="filled"
    />
  );
};
const Email = () => {
  return (
    <TextField
      id="filled-required"
      label="Email"
      type="email"
      placeholder="fish@blob.com"
      defaultValue=""
      variant="filled"
    />
  );
};
const Password = () => {
  return (
    <TextField
      id="filled-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
      variant="filled"
    />
  );
};
function SignUp() {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = (e) => {
    e.preventDefault();
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
            '& .MuiTextField-root': { mb: 2 },
            display: 'flex',
            flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
        >
          <Username username={username} setUserName={setUserName} />
          <Email email={email} setEmail={setEmail} />
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
