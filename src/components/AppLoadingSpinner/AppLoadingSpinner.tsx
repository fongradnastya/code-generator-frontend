import { memo, type FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

const AppLoadingSpinnerComponent: FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      my: 2,
    }}
  >
    <CircularProgress />
  </Box>
);

/** App loading spinner component. */
export const AppLoadingSpinner = memo(AppLoadingSpinnerComponent);
