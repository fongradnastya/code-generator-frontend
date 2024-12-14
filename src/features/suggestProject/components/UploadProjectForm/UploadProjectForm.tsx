import { memo, type FC } from 'react';
import { type ProjectMetadata } from 'src/models/projectMetadata';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { ProjectType } from 'src/models/projectType';
import { FormInputField } from 'src/components/FormInputField';
import { FormSelectField } from 'src/components/FormSelectField';

import styles from './UploadProjectForm.module.css';

const defaultValues = {
  projectName: '',
  projectDescription: '',
  projectFiles: undefined,
  ProjectType: ProjectType.Django,
};

const UploadProjectFormComponent: FC = () => {
  const { register, formState: { errors } } = useForm<ProjectMetadata>({
    defaultValues,
  });

  return (
    <form className={styles.form}>
      <FormInputField
        label="Project Name"
        registration={
          register(
            'projectName',
            {
              required: 'Project name is required',
              max: 100,
              min: 3,
            },
          )
        }
        error={errors.projectName}
      />
      <FormInputField
        label="Project Description"
        registration={
          register(
            'projectDescription',
            {
              max: 500,
            },
          )
        }
        error={errors.projectDescription}
      />
      <FormSelectField
        label="Project Type"
        options={Object.values(ProjectType)}
        registration={register('projectType')}
        error={errors.projectType}

      />
      <Button
        variant="contained"
        color="primary"
      >
        Upload Project Files
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};

/** Upload project form component. */
export const UploadProjectForm = memo(UploadProjectFormComponent);
