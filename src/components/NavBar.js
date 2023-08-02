import React from 'react';
import {
  AppBar, Toolbar, Typography, useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: 'black' }}>
          <motion.h1
            animate={isMobile
              ? { scale: 1.2, y: [120, 0, -120, 0, 120, 0, -120, 0, 120] }
              : { scale: 2, y: [120, 0, -120, 0, 120, 0, -120, 0, 120] }}
            transition={{ duration: 2 }}
          >
            Task Manager
          </motion.h1>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
