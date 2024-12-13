import { type FC, memo } from 'react';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { MessageSeverity } from 'src/models/messageSeverity';

const AUTO_HIDE_DURATION = 3000;

type Props = {

  /** Is snackbar open. */
  readonly isSnackbarOpen: boolean;

  /** Handle snackbar close. */
  readonly onSnackbarClose: () => void;

  /** Snackbar message text. */
  readonly snackbarMessage: string;

  /** Snackbar message severity. */
  readonly severity?: MessageSeverity;
};

const SnackbarMessageComponent: FC<Props> = ({
  isSnackbarOpen,
  onSnackbarClose,
  snackbarMessage,
  severity,
}) => (
  <Snackbar
    open={isSnackbarOpen}
    autoHideDuration={AUTO_HIDE_DURATION}
    onClose={onSnackbarClose}
  >
    <Alert
      onClose={onSnackbarClose}
      severity={severity ?? MessageSeverity.Info}
      variant="filled"
    >
      {snackbarMessage}
    </Alert>
  </Snackbar>
);

/** Snackbar message component. */
export const SnackbarMessage = memo(SnackbarMessageComponent);
