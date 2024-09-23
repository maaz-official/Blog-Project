import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const ButtonWithLoader = ({ isLoading, children, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isLoading} // Disable button during loading
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '12px 24px',
        fontWeight: 'bold',
        textTransform: 'none',
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{
            color: '#fff',
            position: 'absolute',
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonWithLoader;
