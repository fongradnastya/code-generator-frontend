import { memo, type FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { selectProjectsLoading, selectUserProjects, selectProjectsError } from 'src/store/userProjects/selectors';
import { selectUserEmail } from 'src/store/authorization/selectors';
import { Loader } from 'src/components/Loader';
import { getUserProjects } from 'src/store/userProjects/dispatchers';

import { ProjectTable } from '../../components/ProjectsTable';

import styles from './ProjectsPage.module.css';

const ProjectsPageComponent: FC = () => {
  const open = useAppSelector(selectIsDrawerOpen);
  const userEmail = useAppSelector(selectUserEmail);
  const projects = useAppSelector(selectUserProjects);
  const isLoading = useAppSelector(selectProjectsLoading);
  const error = useAppSelector(selectProjectsError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userEmail) {
      const userProfile = { email: userEmail };
      dispatch(getUserProjects(userProfile));
    }
  }, [dispatch, userEmail]);

  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography
          variant="h5"
          component="h5"
        >
          Projects
        </Typography>
        {!isLoading && !error && <ProjectTable projects={projects} />}
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

/** Projects list page component. */
export const ProjectsPage = memo(ProjectsPageComponent);
