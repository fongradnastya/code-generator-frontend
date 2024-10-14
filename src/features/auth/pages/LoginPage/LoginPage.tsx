import { memo, type FC } from 'react';
import {
  Avatar, Box, Container, Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

// Template from MUI docs: https://mui.com/getting-started/templates/
const LoginPageComponent: FC = () => (
  <Container maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
    </Box>
  </Container>
);

/** Login page. */
export const LoginPage = memo(LoginPageComponent);
