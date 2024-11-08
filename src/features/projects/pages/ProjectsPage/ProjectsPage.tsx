import { memo, type FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { type Project } from 'src/models/project';
import { ProjectStatus } from 'src/models/projectStatus';
import { ProjectType } from 'src/models/projectType';

import { ProjectTable } from '../../components/ProjectsTable';

import styles from './ProjectsPage.module.css';

/**
 * 1.
 * @param id 1.
 * @param projectName 1.
 * @param creationDate 1.
 * @param projectLanguage 1.
 * @param projectType 1.
 * @param status 1.
 * @returns
 */
function createData(
  id: number,
  projectName: string,
  creationDate: Date,
  projectLanguage: string,
  projectType: ProjectType,
  status: ProjectStatus,
): Project {
  return {
    id,
    projectName,
    creationDate,
    projectLanguage,
    projectType,
    status,
  };
}

/** Projects. */
export const initialProjects = [
  createData(1, 'Cupcake', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(2, 'Donut', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(3, 'Eclair', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(4, 'Frozen yoghurt', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(5, 'Gingerbread', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(6, 'Honeycomb', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(7, 'Ice cream sandwich', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(8, 'Jelly Bean', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(9, 'KitKat', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(10, 'Lollipop', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(11, 'Marshmallow', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(12, 'Nougat', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
  createData(13, 'Oreo', new Date('08.11.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
];

const ProjectsPageComponent: FC = () => {
  const [projects, setProjects] = useState(initialProjects);
  const open = useSelector(selectIsDrawerOpen);
  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography
          variant="h5"
          component="h5"
        >
          Project
        </Typography>
        <ProjectTable
          projects={projects}
        />
      </Container>
    </main>
  );
};

/** Projects list page component. */
export const ProjectsPage = memo(ProjectsPageComponent);
