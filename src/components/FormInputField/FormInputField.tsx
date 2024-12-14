import { type FC, memo } from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';
import { TextField } from '@mui/material';

type Props = {

  /** The label for the input field. */
  readonly label: string;

  /** The form registration for react-hook-form. */
  readonly registration: UseFormRegisterReturn;

  /** Input field error. */
  readonly error?: FieldError;
};

const FormInputFieldComponent: FC<Props> = ({
  label,
  registration,
  error,
}) => (
  <TextField
    {...registration}
    fullWidth
    label={label}
    error={error != null}
  />
);

/** Form input field component. */
export const FormInputField = memo(FormInputFieldComponent);
