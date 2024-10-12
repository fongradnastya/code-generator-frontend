import { type FC, memo } from 'react';
import { Box } from '@mui/material';

import styles from './HomePage.module.css';

const HomePageComponent: FC = () => (
  <Box className={styles.homePageContainer}>
    <h1>Boilerplate (v. 0.0.0-dev) works 🎉🎉🎉</h1>
    <section>
      <h2>Next steps:</h2>
      <ol className={styles.nextStepsList}>
        <li>
          Globally replace
          <code className={styles.code}>saritasa-react-boilerplate</code>
          to your project name in
          <em>kebab-case</em>
        </li>
        <li>Set up the environment</li>
        <li>Fill the root README with relevant data and remove the information about the boilerplate setup</li>
        <li>
          Adjust CODEOWNERS of your application, make sure you have at least
          one code reviewer before starting a project 👨‍💻
        </li>
      </ol>
    </section>
  </Box>
);

/** Home page. */
export const HomePage = memo(HomePageComponent);
