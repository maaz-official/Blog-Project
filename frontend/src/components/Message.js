import React from 'react';
import { Box, Typography, Alert } from '@mui/material';

const Message = ({ variant = 'info', message }) => {
  return (
    <Box
      sx={{
        margin: '20px auto',
        maxWidth: '600px',
      }}
    >
      <Alert severity={variant} sx={{ fontSize: '16px' }}>
        <Typography variant="body1">
          {message}
        </Typography>
      </Alert>
    </Box>
  );
};

export default Message;
