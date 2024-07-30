import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Popover, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';
import logo from '../assets/logo.png'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className="navbar"sx={{backgroundColor:'rgba(0,0,0,0.8)'}}>
      <Toolbar className="toolbar">
        <IconButton edge="start" color="inherit" aria-label="menu" className="menuButton" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <img src={logo} alt="TechCodeHub Logo" className="logo" />
        <Typography variant="h6" className="title">
          TechCodeHub
        </Typography>
        <div className="menuItems">
          <Button color="inherit" className="navButton" component={Link} to="/">Home</Button>
          <Button color="inherit" className="navButton" component={Link} to="/about">About</Button>
          <Button color="inherit" className="navButton" component={Link} to="/signin">Login</Button>
          <Button color="inherit" className="navButton" component={Link} to="/signup">Signup</Button>
        </div>
      </Toolbar>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className="popoverContent"
      >
        <MenuItem className="popoverItem" component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
        <MenuItem className="popoverItem" component={Link} to="/books" onClick={handleMenuClose}>Books</MenuItem>
        <MenuItem className="popoverItem" component={Link} to="/programs" onClick={handleMenuClose}>Programs</MenuItem>
        <MenuItem className="popoverItem" component={Link} to="/notes" onClick={handleMenuClose}>Notes</MenuItem>
      </Popover>
    </AppBar>
  );
};

export default Navbar;
