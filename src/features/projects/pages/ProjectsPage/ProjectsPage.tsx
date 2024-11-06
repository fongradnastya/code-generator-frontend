import { memo, type FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { type ProjectInfo } from 'src/models/projectInfo';

import { ProjectTable } from '../../components/ProjectsTable';

import styles from './ProjectsPage.module.css';

/**
 * 1.
 * @param id 1.
 * @param name 1.
 * @param calories 1.
 * @param fat 1.
 * @param carbs 1.
 * @param protein 1.
 */
function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): ProjectInfo {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

/** Projects. */
export const initialProjects = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
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
