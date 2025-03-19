import { memo, type FC, useCallback, useEffect } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'src/store';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import { useNavigate } from 'react-router-dom';
import { selectProjectLoading, selectUploadError } from 'src/store/projects/selectors';
import { clearErrors } from 'src/store/authorization/slice';
import Typography from '@mui/material/Typography';
import { type ProjectUpload } from 'src/models/projectUpload';
import { uploadProject } from 'src/store/projects/dispatchers';
import { Loader } from 'src/components/Loader';
import Container from '@mui/material/Container';

import { UploadProjectForm } from '../../components/UploadProjectForm';

import styles from './SuggestProjectPage.module.css';

const SuggestProjectPageComponent: FC = () => {
  const open = useAppSelector(selectIsDrawerOpen);
  const projectsUrl = '/projects';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectProjectLoading);
  const loginErrors = useAppSelector(selectUploadError);

  const submitForm: SubmitHandler<ProjectUpload> = useCallback(data => {
    dispatch(uploadProject(data))
      .then(
        uploadResult => {
          if (uploadResult.type.endsWith('fulfilled')) {
            navigate(projectsUrl);
          }
        },
      );
  }, [dispatch, navigate]);

  useEffect(() => () => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography
          variant="h5"
          component="h5"
        >
          Suggest New Project
        </Typography>
        <UploadProjectForm
          onSubmit={submitForm}
          serverErrors={loginErrors ?? []}
        />
      </Container>
      { isLoading && <Loader/> }
    </main>
  );
};

/** Suggest project page component. */
export const SuggestProjectPage = memo(SuggestProjectPageComponent);
