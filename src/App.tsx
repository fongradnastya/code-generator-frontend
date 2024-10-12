import { type FC, Suspense } from 'react';
import { Box, Container } from '@mui/material';

import { AppHeader } from './components/AppHeader';
import { AppLoadingSpinner } from './components/AppLoadingSpinner';
import { RootRouter } from './routes/RootRouter';
import './theme';
import { RestoreUserWrapper } from './components/RestoreUserWrapper';

/** App component. */
export const App: FC = () => (
  <RestoreUserWrapper>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppHeader />
      <Container component="main" sx={{ padding: 2, flexGrow: 1 }}>
        <Suspense fallback={<AppLoadingSpinner />}>
          <RootRouter />
        </Suspense>
      </Container>
    </Box>
  </RestoreUserWrapper>
);
