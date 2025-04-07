import { memo, type FC, useState, useCallback, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { TemplateType } from 'src/models/templateType';
import { TemplateStatus } from 'src/models/templateStatus';
import { FormInputField } from 'src/components/FormInputField';
import { FormSelectField } from 'src/components/FormSelectField';
import { type ServerError } from 'src/models/serverError';
import { HandleErrorsService } from 'src/api/services/handleErrorService';
import { z } from 'zod';
import Chip from '@mui/material/Chip';

import { FileUploadDialog } from '../FileUploadDialog';

import styles from './TemplateCreationForm.module.css';

// Define validation schema for the form with separate file fields
const validationSchema = z.object({
  templateName: z.string().min(1, { message: 'Template name is required' }),
  templateDescription: z.string().max(150, { message: 'Template description is too long' }),
  templateType: z.nativeEnum(TemplateType),
  templateStatus: z.nativeEnum(TemplateStatus),
  templateFiles: z
    .instanceof(File, { message: 'Please upload a valid file' })
    .optional()
    .refine(file => file instanceof File && file.size > 0, { message: 'File cannot be empty' }),
  jsonFile: z
    .instanceof(File, { message: 'Please upload a valid file' })
    .optional()
    .refine(file => file instanceof File && file.size > 0, { message: 'File cannot be empty' }),
});

type TemplateUploadFormValues = z.infer<typeof validationSchema>;

type Props = {

  /** Handles user login on form submit. */
  onSubmit: SubmitHandler<TemplateUploadFormValues>;

  /** An array of error received from the server. */
  serverErrors: readonly ServerError[];
};

const defaultValues: TemplateUploadFormValues = {
  templateName: '',
  templateDescription: '',
  templateFiles: undefined,
  jsonFile: undefined,
  templateType: TemplateType.Django,
  templateStatus: TemplateStatus.Draft,
};

const TemplateCreationFormComponent: FC<Props> = ({
  onSubmit,
  serverErrors,
}) => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [uploadedZipFile, setUploadedZipFile] = useState<File | null>(null);
  const [uploadedJsonFile, setUploadedJsonFile] = useState<File | null>(null);

  const { handleSubmit, formState: { errors }, register, setError, setValue, control } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    HandleErrorsService.setErrors(serverErrors, setError, defaultValues);
  }, [serverErrors, setError]);

  const handleFileDialogClose = useCallback(() => setIsFileDialogOpen(false), []);
  const handleFileDialogOpen = useCallback(() => setIsFileDialogOpen(true), []);

  const handleZipFileUpload = useCallback((file: File) => {
    setUploadedZipFile(file);
    setValue('templateFiles', file, { shouldValidate: true });
  }, [setValue]);

  const handleJsonFileUpload = useCallback((file: File) => {
    setUploadedJsonFile(file);
    setValue('jsonFile', file, { shouldValidate: true });
  }, [setValue]);

  const handleFileDelete = useCallback((file: File) => {
    if (file === uploadedZipFile) {
      setUploadedZipFile(null);
      setValue('templateFiles', undefined, { shouldValidate: true });
    } else if (file === uploadedJsonFile) {
      setUploadedJsonFile(null);
      setValue('jsonFile', undefined, { shouldValidate: true });
    }

  }, [uploadedZipFile, uploadedJsonFile, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormInputField
          label="Template Name"
          registration={
            register(
              'templateName',
              {
                required: 'Template name is required',
                max: 100,
                min: 3,
              },
            )
          }
          error={errors.templateName}
        />
        <FormInputField
          label="Template Description"
          registration={
            register(
              'templateDescription',
              {
                max: 500,
              },
            )
          }
          error={errors.templateDescription}
        />
        <FormSelectField
          label="Project Type"
          options={Object.values(TemplateType)}
          control={control}
          name="templateType"
        />
        <FormSelectField
          label="Project Status"
          options={Object.values(TemplateStatus)}
          control={control}
          name="templateStatus"
        />
        <div className={styles.fileUploadContainer}>
          <Button variant="contained" color="primary" onClick={handleFileDialogOpen}>
            Upload Template Files
          </Button>
          <div className={styles.chipsContainer}>
            {uploadedZipFile && (
              <Chip
                label={uploadedZipFile.name}
                onDelete={() => handleFileDelete(uploadedZipFile)}
                color="primary"
              />
            )}
            {uploadedJsonFile && (
              <Chip
                label={uploadedJsonFile.name}
                onDelete={() => handleFileDelete(uploadedJsonFile)}
                color="primary"
              />
            )}
          </div>
        </div>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>

      <FileUploadDialog
        uploadedFiles={{ zip: uploadedZipFile, json: uploadedJsonFile }}
        isFileDialogOpen={isFileDialogOpen}
        onZipFileUpload={handleZipFileUpload}
        onJsonFileUpload={handleJsonFileUpload}
        onFileDelete={handleFileDelete}
        onFileDialogClose={handleFileDialogClose}
      />
    </>
  );
};

/** 1. */
export const TemplateCreationForm = memo(TemplateCreationFormComponent);
