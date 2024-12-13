import { memo, type FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import styles from './SuggestProjectPage.module.css';

const SuggestProjectPageComponent: FC = () => {
  const open = useSelector(selectIsDrawerOpen);
  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography
          variant="h5"
          component="h5"
        >
          Suggest New Project
        </Typography>
      </Container>
    </main>
  );
};

/** Suggest project page component. */
export const SuggestProjectPage = memo(SuggestProjectPageComponent);
