import { memo, type FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { selectTemplatesLoading, selectUserTemplates, selectTemplatesError } from 'src/store/userTemplates/selectors';
import { selectUserEmail } from 'src/store/authorization/selectors';
import { Loader } from 'src/components/Loader';
import { getUserTemplates } from 'src/store/userTemplates/dispatchers';

import { TemplateTable } from '../../components/TemplateTable';

import styles from './TemplatesPage.module.css';

const TemplatesPageComponent: FC = () => {
  const open = useAppSelector(selectIsDrawerOpen);
  const userEmail = useAppSelector(selectUserEmail);
  const templates = useAppSelector(selectUserTemplates);
  const isLoading = useAppSelector(selectTemplatesLoading);
  const error = useAppSelector(selectTemplatesError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userEmail) {
      const userProfile = { email: userEmail };
      dispatch(getUserTemplates(userProfile));
    }
  }, [dispatch, userEmail]);

  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography
          variant="h5"
          component="h5"
        >
          My Templates
        </Typography>
        {!isLoading && !error && <TemplateTable templates={templates} />}
        { isLoading && <Loader/> }
        {error && (
          <Typography variant="body1" color="error">
            {error?.length > 0 ? error[0].controlErrors : 'An error occurred'}
          </Typography>
        )}
      </Container>
    </main>
  );
};

/** Templates list page component. */
export const TemplatesPage = memo(TemplatesPageComponent);
