import { type FC, memo } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

type Props = {

  /** The label for the checkbox. */
  readonly label: string;

  /** Checkbox value. */
  readonly value: boolean;

  /** The form registration for react-hook-form. */
  readonly registration: UseFormRegisterReturn;
};

const FormCheckboxComponent: FC<Props> = ({
  label,
  value,
  registration,
}) => (
  <FormControlLabel
    control={(
      <Checkbox
        {...registration}
        checked={value}
      />
    )}
    label={label}
  />
);

/** Form checkbox component. */
export const FormCheckbox = memo(FormCheckboxComponent);
