/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, type FC, useEffect, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { Button } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInputField } from 'src/components/FormInputField';
import { FormCheckbox } from 'src/components/FormCheckbox';

import styles from './TemplateForm.module.css';

const schema = z.object({
  // Schema will be dynamically set based on the formData
});

type FormSchema = FieldValues;

type TemplateFormProps = {

  /** 1. */
  readonly initialData: any;

  /** 1. */
  readonly onSubmit: () => void;
};

const TemplateFormComponent: FC<TemplateFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<any>(initialData);
  const { handleSubmit, register, reset } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  // Reset form whenever initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      reset(initialData);
    }
  }, [initialData, reset]);

  const renderField = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return (
        <select {...register(key)}>
          {value.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
    if (typeof value === 'string' && (value === 'y' || value === 'n')) {
      return (
        <FormCheckbox
          label={key}
          value={value === 'y'}
          registration={register(key)}
        />
      );
    }
    return (
      <FormInputField
        registration={register(key)}
        label={key}
      />
    );
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} style={{ marginBottom: '16px' }}>
          {renderField(key, value)}
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

/** Template form component. */
export const TemplateForm = memo(TemplateFormComponent);
