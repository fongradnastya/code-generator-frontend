import { memo, type FC, useCallback, useEffect } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'src/store';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import { useNavigate } from 'react-router-dom';
import { selectTemplateLoading, selectUploadError } from 'src/store/templateUpload/selectors';
import { clearErrors } from 'src/store/authorization/slice';
import Typography from '@mui/material/Typography';
import { type TemplateUpload } from 'src/models/templateUpload';
import { uploadTemplate } from 'src/store/templateUpload/dispatchers';
import { Loader } from 'src/components/Loader';
import Container from '@mui/material/Container';

import { UploadTemplateForm } from '../../components/TemplateCreationForm';

import styles from './SuggestTemplatePage.module.css';

const SuggestTemplatePageComponent: FC = () => {
  const open = useAppSelector(selectIsDrawerOpen);
  const templatesUrl = '/templates';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectTemplateLoading);
  const loginErrors = useAppSelector(selectUploadError);

  const submitForm: SubmitHandler<TemplateUpload> = useCallback(data => {
    dispatch(uploadTemplate(data))
      .then(
        uploadResult => {
          if (uploadResult.type.endsWith('fulfilled')) {
            navigate(templatesUrl);
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
          Suggest New Template
        </Typography>
        <UploadTemplateForm
          onSubmit={submitForm}
          serverErrors={loginErrors ?? []}
        />
      </Container>
      { isLoading && <Loader/> }
    </main>
  );
};

/** Suggest template page component. */
export const SuggestTemplatePage = memo(SuggestTemplatePageComponent);
