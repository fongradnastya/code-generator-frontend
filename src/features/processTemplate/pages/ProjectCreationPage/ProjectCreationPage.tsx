import { memo, type FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { TemplateForm } from '../../components/TemplateForm';

import styles from './TemplateCreationPage.module.css';

const TemplateCreationPageComponent: FC = () => {
  const open = useSelector(selectIsDrawerOpen);
  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography
          variant="h5"
          component="h5"
        >
          Create New Template
        </Typography>
        <TemplateForm/>
      </Container>
    </main>
  );
};

/** Template creation page component. */
export const TemplateCreationPage = memo(TemplateCreationPageComponent);
