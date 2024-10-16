import { memo, type FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Box, Button, Link, Toolbar,
} from '@mui/material';

const AppHeaderComponent: FC = () => (
  <AppBar position="relative">
    <Toolbar>
      {/* Read more about routing in MUI here: https://mui.com/guides/routing/ */}
      <Link
        component={RouterLink}
        to="/"
        variant="h5"
        color="inherit"
        underline="none"
        noWrap
      >
        React Boilerplate
      </Link>
      <div />
      <Box sx={{ flexGrow: 1 }} />
      <Button
        component={RouterLink}
        color="inherit"
        variant="outlined"
        to="login"
      >
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

/** App header component. */
export const AppHeader = memo(AppHeaderComponent);
