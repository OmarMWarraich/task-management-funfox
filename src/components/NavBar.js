import React from 'react';
import {
  AppBar, Toolbar, Typography,
} from '@mui/material';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
        Task Manager
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NavBar;
