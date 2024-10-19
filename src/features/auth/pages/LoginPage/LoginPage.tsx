import { memo, type FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { LoginForm } from '../../components/LoginForm';

import styles from './LoginPage.module.css';

const LoginPageComponent: FC = () => {
  const open = useSelector(selectIsDrawerOpen);
  const registrationUrl = '/registration';

  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Paper
        elevation={3}
        className={styles.layoutCard}
      >
        <Typography
          variant="h5"
          component="h5"
        >
          Login
        </Typography>
        <LoginForm
          onSubmit={() => null}
          serverErrors={[]}
        />
        <Typography component="p">
          Don`t have an account?
          <Link
            component={NavLink}
            to={registrationUrl}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </main>
  );
};

/** User login page. */
export const LoginPage = memo(LoginPageComponent);
