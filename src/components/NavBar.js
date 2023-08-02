import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar position="static">
      <Toolbar sx={{
        display: 'flex', height: '8rem', alignItems: 'center',
      }}
      >
        <Typography
          variant="h3"
          sx={{
            flexGrow: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontFamily: 'Roboto', letterSpacing: '0.1rem',
          }}
        >
          <motion.div
            initial={{ scale: 1, opacity: 0, y: 0 }}
            animate={isMobile
              ? { scale: 1.2, y: 120, opacity: 1 }
              : { scale: 1.6, y: 120, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'linear', type: 'tween' }}
          >
            Task Manager
          </motion.div>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
