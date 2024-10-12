import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingProcess = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full screen height
        width: '100vw', // Full screen height
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional background overlay
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
};

export default LoadingProcess;
