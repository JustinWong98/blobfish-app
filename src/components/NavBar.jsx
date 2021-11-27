import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {navigate('/front')}}>Home</MenuItem>
        <MenuItem onClick={() => {navigate('/Dashboard')}}>Dashboard</MenuItem>
        <MenuItem onClick={() => {navigate('/avatar')}}>Create An Avatar</MenuItem>
      </Menu>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            fontWeight="700"
          >
            BlobFish
          </Typography>
          <Button color="inherit" onClick={() => {navigate('/login')}}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              fontWeight="700"
            >
              Login
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
