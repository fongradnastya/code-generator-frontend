import { memo, type FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { RegistrationForm } from '../../components/RegistrationForm';

import styles from './RegistrationPage.module.css';

const RegistrationPageComponent: FC = () => {
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const loginUrl = '/login';

  return (
    <main className={`${styles.layout} ${isDrawerOpen ? styles.layout_open : ''}`}>
      <Paper
        elevation={3}
        className={styles.layout__card}
      >
        <Typography
          variant="h5"
          component="h5"
        >
          Registration
        </Typography>
        <RegistrationForm
          onSubmit={() => null}
          serverErrors={[]}
        />
        <Typography component="p">
          Already have an account?
          <Link
            component={NavLink}
            to={loginUrl}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </main>
  );
};

/** User registration page. */
export const RegistrationPage = memo(RegistrationPageComponent);
