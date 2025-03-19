import { type FC, memo } from 'react';
import { useController, type Control } from 'react-hook-form';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { z } from 'zod';
import { ProjectStatus } from 'src/models/projectStatus';
import { ProjectType } from 'src/models/projectType';

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

  /** 1. */
  readonly label: string;

  /** 1. */
  readonly options: string[];

  /** 1. */
  readonly name: keyof ProjectUploadFormValues;

  /** 1. */
  readonly control: Control<ProjectUploadFormValues>;
};

const FormSelectFieldComponent: FC<Props> = ({ label, options, name, control }) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel id={`${label}-label`}>
        { label }
      </InputLabel>
      <Select
        labelId={`${label}-label`}
        label={label}
        value={field.value ?? ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
      >
        {options.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

/** 1. */
export const FormSelectField = memo(FormSelectFieldComponent);
