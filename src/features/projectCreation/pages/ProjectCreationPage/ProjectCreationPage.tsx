import { memo, type FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ProjectForm } from '../../components/ProjectForm';

import styles from './ProjectCreationPage.module.css';

const ProjectCreationPageComponent: FC = () => {
  const open = useSelector(selectIsDrawerOpen);
  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography
          variant="h5"
          component="h5"
        >
          Create New Project
        </Typography>
        <ProjectForm/>
      </Container>
    </main>
  );
};

/** Project creation page component. */
export const ProjectCreationPage = memo(ProjectCreationPageComponent);
