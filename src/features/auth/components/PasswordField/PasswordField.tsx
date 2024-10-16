import { memo, type FC, type MouseEvent, useState, useCallback } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

import styles from './PasswordField.module.css';

type Props = {

  /** Does the field have an error. */
  readonly hasError: boolean;

  /** Error message. */
  readonly errorMessage?: string;

  /** Fields label. */
  readonly label: string;

  /** Controller field from react hook forms. */
  readonly field: object;
};

const PasswordFieldComponent: FC<Props> = ({
  hasError,
  errorMessage,
  label,
  field,
}: Props) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  return (
    <FormControl
      error={hasError}
      className={styles.form__control}
    >
      <InputLabel>
        {label}
      </InputLabel>
      <OutlinedInput
        {...field}
        type={showPassword ? 'text' : 'password'}
        autoComplete="password"
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}
        label={label}
      />
      {errorMessage && (
        <FormHelperText>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

/** Password field component. */
export const PasswordField = memo(PasswordFieldComponent);
