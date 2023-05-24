import { Box } from '@mui/system';
import React from 'react';

export default function Page404() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
      }}>
      404 | The page is not exist
    </Box>
  );
}
