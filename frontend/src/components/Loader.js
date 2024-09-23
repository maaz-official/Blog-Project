import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure the loader appears on top
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress 
          size={60} 
          thickness={4} 
          sx={{ color: 'primary.main' }} 
        />
        <Typography 
          variant="h6" 
          sx={{ marginTop: 2, color: 'text.secondary' }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;
