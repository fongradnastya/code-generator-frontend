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
 * Creates projects.
 * @param id Project id.
 * @param projectName Project name.
 * @param creationDate Project creation date.
 * @param projectLanguage Project language.
 * @param projectType Project type.
 * @param status Project status.
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
  createData(2, 'Donut', new Date('06.11.2024'), 'Python 3.2.2', ProjectType.FastApi, ProjectStatus.Build),
  createData(3, 'Eclair', new Date('07.11.2024'), 'Java 17', ProjectType.Spring, ProjectStatus.Cancelled),
  createData(4, 'Frozen yoghurt', new Date('08.10.2024'), 'Kotlin 3', ProjectType.Spring, ProjectStatus.Draft),
  createData(5, 'Gingerbread', new Date('01.10.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Draft),
  createData(6, 'Honeycomb', new Date('03.10.2024'), 'Python 2.2.8', ProjectType.Django, ProjectStatus.Build),
  createData(7, 'Ice cream sandwich', new Date('10.10.2024'), 'Python 2.2.9', ProjectType.Django, ProjectStatus.Suggested),
  createData(8, 'Jelly Bean', new Date('10.09.2024'), 'Java 16', ProjectType.Spring, ProjectStatus.Build),
  createData(9, 'KitKat', new Date('08.09.2024'), 'Python 3.1.1', ProjectType.FastApi, ProjectStatus.Suggested),
  createData(10, 'Lollipop', new Date('05.09.2024'), 'Kotlin 5', ProjectType.Spring, ProjectStatus.Cancelled),
  createData(11, 'Marshmallow', new Date('04.09.2024'), 'Java 17', ProjectType.Spring, ProjectStatus.Build),
  createData(12, 'Nougat', new Date('08.08.2024'), 'Python 3.2.2', ProjectType.FastApi, ProjectStatus.Draft),
  createData(13, 'Oreo', new Date('11.08.2024'), 'Python 3.1', ProjectType.Django, ProjectStatus.Suggested),
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
          Projects
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
