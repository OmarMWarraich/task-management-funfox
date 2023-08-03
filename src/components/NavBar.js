import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const isTinyScreen = useMediaQuery('(max-width:400px)');
  const {
    loginWithRedirect, isAuthenticated, logout, user,
  } = useAuth0();
  const picture = user?.picture;
  const name = user?.name;

  return (
    <AppBar position="fixed">
      <Toolbar sx={
        isMobile || isTablet // Combine mobile and tablet styles
          ? {
            display: 'flex',
            height: '8rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            fontSize: isTablet ? '1.2rem' : undefined, // Set font size for tablet
          }
          : {
            display: 'flex',
            height: '8rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }
      }
      >
        <Typography
          variant="h3"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            letterSpacing: '0.1rem',
          }}
        >
          <motion.div
            initial={{ scale: 1, opacity: 0, y: 0 }}
            animate={isMobile
              ? { scale: 0.5, opacity: 1 }
              : { scale: isTablet ? 1.1 : 1.2, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'linear', type: 'tween' }}
          >
            Task Manager
          </motion.div>
        </Typography>

        {isAuthenticated ? ( // Reorder the buttons for authenticated users
          <Box display="flex" alignItems="center">
            <img
              src={picture}
              alt={name}
              style={{ width: '50px', borderRadius: '50%' }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => logout({ returnTo: window.location.origin })}
              sx={{
                marginLeft: isMobile ? '1rem' : undefined,
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection={isTinyScreen ? 'column' : 'row'}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => loginWithRedirect({
                screen_hint: 'signup',
              })}
              sx={{
                marginBottom: isTinyScreen ? '1rem' : undefined,
                marginRight: isTinyScreen ? undefined : '1rem',
              }}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
