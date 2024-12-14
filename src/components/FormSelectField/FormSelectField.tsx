import { type FC, memo } from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

type Props = {

  /** The label for the input field. */
  readonly label: string;

  /** Select options. */
  readonly options: string[];

  /** The form registration for react-hook-form. */
  readonly registration: UseFormRegisterReturn;

  /** Input field error. */
  readonly error?: FieldError;
};

const FormSelectFieldComponent: FC<Props> = ({
  label,
  options,
  registration,
  error,
}) => (
  <FormControl fullWidth>
    <InputLabel id={`${label}-label`}>
      {label}
    </InputLabel>
    <Select
      labelId={`${label}-label`}
      label={label}
      {...registration}
      error={error != null}
    >
      {options.map((option: string) => (
        <MenuItem
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

/** Form select field component. */
export const FormSelectField = memo(FormSelectFieldComponent);
