import { memo, type FC, useState, useCallback } from 'react';
import { type ProjectUpload } from 'src/models/projectUpload';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { ProjectType } from 'src/models/projectType';
import { ProjectStatus } from 'src/models/projectStatus';
import { FormInputField } from 'src/components/FormInputField';
import { FormSelectField } from 'src/components/FormSelectField';
import Chip from '@mui/material/Chip';

import { FileUploadDialog } from '../FileUploadDialog';

import styles from './UploadProjectForm.module.css';

const defaultValues = {
  projectName: '',
  projectDescription: '',
  projectFiles: undefined,
  projectType: ProjectType.Django,
  projectStatus: ProjectStatus.Draft,
};

const UploadProjectFormComponent: FC = () => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<readonly File[]>([]);

  const handleFileDialogClose = useCallback(
    () => setIsFileDialogOpen(false),
    [],
  );

  const handleFileDialogOpen = useCallback(
    () => setIsFileDialogOpen(true),
    [],
  );

  const handleFilesUpload = useCallback(
    (files: readonly File[]) => setUploadedFiles(uploadedFiles?.concat(files)),
    [uploadedFiles],
  );

  const handleFileDelete = useCallback((fileToDelete: File) => () => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToDelete));
  }, [uploadedFiles]);

  const { register, formState: { errors } } = useForm<ProjectUpload>({
    defaultValues,
  });

  return (
    <>
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
        <FormSelectField
          label="Project Status"
          options={Object.values(ProjectStatus)}
          registration={register('projectStatus')}
          error={errors.projectStatus}
        />
        <div className={styles.fileUploadContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileDialogOpen}
          >
            Upload Project Files
          </Button>
          <div className={styles.chipsContainer}>
            {uploadedFiles.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                onDelete={handleFileDelete(file)}
                color="primary"
              />
            ))}
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      <FileUploadDialog
        uploadedFiles={uploadedFiles}
        isFileDialogOpen={isFileDialogOpen}
        onFilesUpload={handleFilesUpload}
        onFileDelete={handleFileDelete}
        onFileDialogClose={handleFileDialogClose}
      />
    </>
  );
};

/** Upload project form component. */
export const UploadProjectForm = memo(UploadProjectFormComponent);
