import { memo, type FC, useMemo, useCallback, useEffect, useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'src/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import { selectAuthorizationError, selectAuthorizationLoading } from 'src/store/authorization/selectors';
import { clearErrors } from 'src/store/authorization/slice';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { type Registration } from 'src/models/registration';
import { registerUser } from 'src/store/authorization/dispatchers';
import { AlertDialog } from 'src/components/AlertDialog/AlertDialog';
import { Loader } from 'src/components/Loader';

import { RegistrationForm } from '../../components/RegistrationForm';

import styles from './RegistrationPage.module.css';

const RegistrationPageComponent: FC = () => {
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const loginUrl = '/login';
  const isLoading = useAppSelector(selectAuthorizationLoading);
  const dispatch = useAppDispatch();
  const registrationErrors = useAppSelector(selectAuthorizationError);
  const memoizedErrors = useMemo(() => registrationErrors ?? [], [registrationErrors]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const submitForm: SubmitHandler<Registration> = useCallback(data => {
    dispatch(registerUser(data))
      .then(() => setIsAlertOpen(true));
  }, [dispatch]);

  const handleAlertClose = useCallback(() => {
    setIsAlertOpen(false);
    navigate(loginUrl);
  }, [navigate]);

  useEffect(() => () => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <main className={`${styles.layout} ${isDrawerOpen ? styles.layoutOpen : ''}`}>
      <AlertDialog
        isAlertOpen={isAlertOpen}
        onAlertClose={handleAlertClose}
        title={'Registration successful'}
        description={'Now you can log in a system'}
      />
      <Paper
        elevation={3}
        className={styles.layoutCard}
      >
        <Typography
          variant="h5"
          component="h5"
        >
          Registration
        </Typography>
        <RegistrationForm
          onSubmit={submitForm}
          serverErrors={memoizedErrors}
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
      { isLoading && <Loader/> }
    </main>
  );
};

/** User registration page. */
export const RegistrationPage = memo(RegistrationPageComponent);
