import { memo, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

const defaultValues = {
  projectName: formData.project_name,
  projectSlug: formData.project_slug,
  description: formData.description,
  authorName: formData.author_name,
  email: formData.email,
  openSourceLicense: formData.open_source_license[0],
  usernameType: formData.username_type[0],
  editor: formData.editor[0],
  cloudProvider: formData.cloud_provider[0],
  ciTool: formData.ci_tool[0],
  debug: formData.debug,
};

const schema = z.object({
  projectName: z.string().min(1, { message: 'Project name is required' }),
  email: z.string().min(1, { message: 'Email is required' })
    .email('Invalid email address'),
});

type FormSchema = z.infer<typeof schema>;

const ProjectFormComponent: FC = () => {
  const { handleSubmit, control, register } = useForm<FormSchema>({
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
        <FormControl fullWidth>
          <InputLabel id={`${key}-label`}>
            {key}
          </InputLabel>
          <Controller
            name={key as keyof FormSchema}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId={`${key}-label`}
                label={key}
              >
                {value.map((option: string) => (
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
        </FormControl>
      );
    }
    if (typeof value === 'string' && (value === 'y' || value === 'n')) {
      return (
        <Controller
          name={key as keyof FormSchema}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={(
                <Checkbox
                  {...field}
                  checked={field.value === 'y'}
                  onChange={e => field.onChange(e.target.checked ? 'y' : 'n')}
                />
              )}
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
      />
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
