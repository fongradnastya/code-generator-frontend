import { memo, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInputField } from 'src/components/FormInputField';
import { FormSelectField } from 'src/components/FormSelectField';
import { FormCheckbox } from 'src/components/FormCheckbox';

import styles from './ProjectForm.module.css';

const formData = {
  projectName: 'My Awesome Project',
  projectSlug: 'my_awesome_project',
  description: 'Behold My Awesome Project!',
  authorName: 'Daniel Roy Greenfeld',
  email: 'daniel@example.com',
  openSourceLicense: ['MIT', 'BSD', 'GPLv3', 'Apache Software License 2.0', 'Not open source'],
  usernameType: ['username', 'email'],
  editor: ['None', 'PyCharm', 'VS Code'],
  cloudProvider: ['AWS', 'GCP', 'Azure', 'None'],
  ciTool: ['None', 'Travis', 'Gitlab', 'Github', 'Drone'],
  debug: 'n',
};

const defaultValues = {
  projectName: formData.projectName,
  projectSlug: formData.projectSlug,
  description: formData.description,
  authorName: formData.authorName,
  email: formData.email,
  openSourceLicense: formData.openSourceLicense[0],
  usernameType: formData.usernameType[0],
  editor: formData.editor[0],
  cloudProvider: formData.cloudProvider[0],
  ciTool: formData.ciTool[0],
  debug: formData.debug,
};

const schema = z.object({
  projectName: z.string().min(1, { message: 'Project name is required' }),
  email: z.string().min(1, { message: 'Email is required' })
    .email('Invalid email address'),
});

type FormSchema = z.infer<typeof schema>;

const ProjectFormComponent: FC = () => {
  const { handleSubmit, register } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FormSchema) => {
    // eslint-disable-next-line no-console
    console.log('Form Data:', data);
  };

  const renderField = (key: string, value: string | string[]) => {
    if (Array.isArray(value)) {
      return (
        <FormSelectField
          label={key}
          options={value}
          registration={register(key as keyof FormSchema)}
        />
      );
    }
    if (typeof value === 'string' && (value === 'y' || value === 'n')) {
      return (
        <FormCheckbox
          label={key}
          value={value === 'y'}
          registration={register(key as keyof FormSchema)}
        />
      );
    }
    return (
      <FormInputField
        registration={register(key as keyof FormSchema)}
        label={key}
      />
    );
  };

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

/** Project form component. */
export const ProjectForm = memo(ProjectFormComponent);
