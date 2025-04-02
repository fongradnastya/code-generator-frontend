import { type FC, memo } from 'react';
import { useController, type Control } from 'react-hook-form';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { z } from 'zod';
import { TemplateStatus } from 'src/models/templateStatus';
import { TemplateType } from 'src/models/templateType';

const validationSchema = z.object({
  templateName: z
    .string()
    .min(1, { message: 'Template name is required' }),
  templateDescription: z
    .string()
    .max(150, { message: 'Template description is too long' }),
  templateType: z.nativeEnum(TemplateType),
  templateStatus: z.nativeEnum(TemplateStatus),
  templateFiles: z
    .instanceof(File, { message: 'Please upload a valid file' })
    .optional()
    .refine(file => file instanceof File && file.size > 0, { message: 'File cannot be empty' }),
});

type TemplateUploadFormValues = z.infer<typeof validationSchema>;

type Props = {

  /** 1. */
  readonly label: string;

  /** 1. */
  readonly options: string[];

  /** 1. */
  readonly name: keyof TemplateUploadFormValues;

  /** 1. */
  readonly control: Control<TemplateUploadFormValues>;
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
