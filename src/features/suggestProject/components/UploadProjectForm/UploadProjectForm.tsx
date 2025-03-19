import { memo, type FC, useState, useCallback, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { ProjectType } from 'src/models/projectType';
import { ProjectStatus } from 'src/models/projectStatus';
import { FormInputField } from 'src/components/FormInputField';
import { FormSelectField } from 'src/components/FormSelectField';
import { type ServerError } from 'src/models/serverError';
import { HandleErrorsService } from 'src/api/services/handleErrorService';
import { z } from 'zod';
import Chip from '@mui/material/Chip';

import { FileUploadDialog } from '../FileUploadDialog';

import styles from './UploadProjectForm.module.css';

const validationSchema = z.object({
  projectName: z
    .string()
    .min(1, { message: 'Project name is required' }),
  projectDescription: z
    .string()
    .max(150, { message: 'Project description is too long' }),
  projectType: z.nativeEnum(ProjectType),
  projectStatus: z.nativeEnum(ProjectStatus),
  projectFiles: z
    .instanceof(File, { message: 'Please upload a valid file' })
    .optional()
    .refine(file => file instanceof File && file.size > 0, { message: 'File cannot be empty' }),
});

type ProjectUploadFormValues = z.infer<typeof validationSchema>;

type Props = {

  /** Handles user login on form submit. */
  onSubmit: SubmitHandler<ProjectUploadFormValues>;

  /** An array of error received from the server. */
  serverErrors: readonly ServerError[];
};

const defaultValues: ProjectUploadFormValues = {
  projectName: '',
  projectDescription: '',
  projectFiles: undefined,
  projectType: ProjectType.Django,
  projectStatus: ProjectStatus.Draft,
};

const UploadProjectFormComponent: FC<Props> = ({
  onSubmit,
  serverErrors,
}) => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<readonly File[]>([]);

  const { handleSubmit, formState: { errors }, register, setError, setValue, control } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    HandleErrorsService.setErrors(serverErrors, setError, defaultValues);
  }, [serverErrors, setError]);

  const handleFileDialogClose = useCallback(
    () => setIsFileDialogOpen(false),
    [],
  );

  const handleFileDialogOpen = useCallback(
    () => setIsFileDialogOpen(true),
    [],
  );

  const handleFilesUpload = useCallback(
    (files: readonly File[]) => {
      const newFiles = uploadedFiles.concat(files);
      setUploadedFiles(newFiles);
      setValue('projectFiles', newFiles[0], { shouldValidate: true });
    },
    [uploadedFiles, setValue],
  );

  const handleFileDelete = useCallback(
    (fileToDelete: File) => () => {
      const filteredFiles = uploadedFiles.filter(file => file !== fileToDelete);
      setUploadedFiles(filteredFiles);
      setValue('projectFiles', undefined, { shouldValidate: true });
    },
    [uploadedFiles, setValue],
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
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
          control={control}
          name="projectType"
        />
        <FormSelectField
          label="Project Status"
          options={Object.values(ProjectStatus)}
          control={control}
          name="projectStatus"
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
