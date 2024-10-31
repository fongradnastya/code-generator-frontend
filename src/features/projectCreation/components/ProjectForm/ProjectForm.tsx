import { memo, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './ProjectForm.module.css';

const formData = {
  project_name: 'My Awesome Project',
  project_slug: 'my_awesome_project',
  description: 'Behold My Awesome Project!',
  author_name: 'Daniel Roy Greenfeld',
  email: 'daniel@example.com',
  open_source_license: ['MIT', 'BSD', 'GPLv3', 'Apache Software License 2.0', 'Not open source'],
  username_type: ['username', 'email'],
  editor: ['None', 'PyCharm', 'VS Code'],
  cloud_provider: ['AWS', 'GCP', 'Azure', 'None'],
  ci_tool: ['None', 'Travis', 'Gitlab', 'Github', 'Drone'],
  debug: 'n',
};

const schema = z.object({
  project_name: z
    .string()
    .min(1, { message: 'Project name is required' }),
  email: z
    .string()
    .min(1, { message: 'Project name is required' })
    .email('Invalid email address'),
});

type FormSchema = z.infer<typeof schema>;

const ProjectFormComponent: FC = () => {
  const { handleSubmit, control, register } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const onSubmit = (data: FormSchema) => {
    // eslint-disable-next-line no-console
    console.log('Form Data:', data);
  };

  const renderField = (key: string, value: string | string[]) => {
    if (Array.isArray(value)) {
      return (
        <Controller
          name={key as keyof FormSchema}
          control={control}
          render={({ field }) => (
            <Select {...field} fullWidth>
              {value
                .map((option: string) => (
                  <MenuItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      );
    }
    if (typeof value === 'string' && (value === 'y' || value === 'n')) {
      return (
        <Controller
          name={key as keyof FormSchema}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value === 'y'} />}
              label={key}
            />
          )}
        />
      );
    }
    return (
      <TextField
        {...register(key as keyof FormSchema)}
        fullWidth
        label={key}
        defaultValue={value}
      />
    );
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.entries(formData)
        .map(([key, value]) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            {renderField(key, value)}
          </div>
        ))}
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

/** Project form component. */
export const ProjectForm = memo(ProjectFormComponent);
