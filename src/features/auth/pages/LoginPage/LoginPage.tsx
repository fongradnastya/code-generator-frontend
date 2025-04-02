import { memo, type FC, useCallback, useEffect } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'src/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import { selectAuthorizationError, selectAuthorizationLoading } from 'src/store/authorization/selectors';
import { clearErrors } from 'src/store/authorization/slice';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { type Login } from 'src/models/login';
import { loginUser } from 'src/store/authorization/dispatchers';
import { Loader } from 'src/components/Loader';

import { LoginForm } from '../../components/LoginForm';

import styles from './LoginPage.module.css';

const LoginPageComponent: FC = () => {
  const open = useAppSelector(selectIsDrawerOpen);
  const registrationUrl = '/registration';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthorizationLoading);
  const loginErrors = useAppSelector(selectAuthorizationError);

  const submitForm: SubmitHandler<Login> = useCallback(data => {
    dispatch(loginUser(data))
      .then(
        loginResult => {
          if (loginResult.type.endsWith('fulfilled')) {
            navigate('/templates');
          }
        },
      );
  }, [dispatch, navigate]);

  useEffect(() => () => {
    dispatch(clearErrors());
  }, [dispatch]);

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
          onSubmit={submitForm}
          serverErrors={loginErrors ?? []}
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
      { isLoading && <Loader/> }
    </main>
  );
};

/** User login page. */
export const LoginPage = memo(LoginPageComponent);
