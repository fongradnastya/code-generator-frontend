import { type FC, useCallback, useState, useEffect, memo } from 'react';
import { FileUploadStatus } from 'src/models/fileUploadStatus';
import { MessageSeverity } from 'src/models/messageSeverity';
import { type AlertMessage } from 'src/models/alertMessage';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Chip from '@mui/material/Chip';
import DialogTitle from '@mui/material/DialogTitle';

import { SnackbarMessage } from '../../../../components/SnackbarMessage';
import { FileUploader } from '../../../../components/FileUploader';

import styles from './FileUploadDialog.module.css';

/** Available file status messages to display. */
enum FileMessage {
  Success = 'A file was successfully loaded.',
  NoFileError = 'File was not selected.',
  LoadingError = 'Only CSV files are allowed.',
  ParsingError = 'An error occurred on file parsing.',
}

type Props = {

  /** Is dialog open. */
  readonly isFileDialogOpen: boolean;

  /** Handle file dialog close. */
  readonly onFileDialogClose: () => void;
};

const FileUploadDialogComponent: FC<Props> = ({ isFileDialogOpen, onFileDialogClose }) => {
  const [files, setFiles] = useState<readonly File[]>([]);
  const [fileUploadStatus, setFileUploadStatus] = useState(FileUploadStatus.Empty);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<AlertMessage | null>();

  const handleSnackbarClose = useCallback(() => {
    setIsSnackbarOpen(false);
    setSnackbarMessage(null);
  }, [setIsSnackbarOpen]);

  const handleFileSet = useCallback((newFiles: readonly File[]) => {
    setFiles(newFiles);
  }, [setFiles]);

  const handleFileUploadStatusSet = useCallback((newStatus: FileUploadStatus) => {
    setFileUploadStatus(newStatus);
  }, [setFileUploadStatus]);

  const handleFileDelete = useCallback((fileToDelete: File) => () => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete));
  }, [setFiles]);

  const displaySnackbarMessage = useCallback((message: FileMessage, severity: MessageSeverity) => {
    setSnackbarMessage({
      message,
      severity,
    });
    setIsSnackbarOpen(true);
  }, [setSnackbarMessage, setIsSnackbarOpen]);

  const parseFiles = useCallback(() => {
    if (files[0] != null) {
      onFileDialogClose();
      setFiles([]);
      setFileUploadStatus(FileUploadStatus.Empty);
    } else {
      displaySnackbarMessage(FileMessage.NoFileError, MessageSeverity.Error);
    }
  }, [files, displaySnackbarMessage, onFileDialogClose, setFileUploadStatus]);

  useEffect(() => {
    if (fileUploadStatus === FileUploadStatus.Reject) {
      displaySnackbarMessage(FileMessage.LoadingError, MessageSeverity.Error);
    } else if (fileUploadStatus === FileUploadStatus.Accept) {
      displaySnackbarMessage(FileMessage.Success, MessageSeverity.Success);
    } else if (fileUploadStatus === FileUploadStatus.Empty) {
      handleSnackbarClose();
    }
  }, [fileUploadStatus, displaySnackbarMessage, handleSnackbarClose]);

  return (
    <>
      <Dialog
        open={isFileDialogOpen}
        onClose={onFileDialogClose}
        className={styles.dialog}
      >
        <DialogTitle
          className={styles.dialogTitle}
        >
          Upload a csv file
        </DialogTitle>
        <DialogContent
          className={styles.dialogContent}
        >
          <FileUploader
            onFilesChange={handleFileSet}
            onStatusChange={handleFileUploadStatusSet}
          />
          <div>
            {files.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                onDelete={handleFileDelete(file)}
                color="primary"
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onFileDialogClose}>Quit</Button>
          <Button
            onClick={parseFiles}
            variant="contained"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      { snackbarMessage && (
        <SnackbarMessage
          isSnackbarOpen={isSnackbarOpen}
          onSnackbarClose={handleSnackbarClose}
          snackbarMessage={snackbarMessage?.message ?? ''}
          severity={snackbarMessage?.severity}
        />
      )}
    </>
  );
};

/** File upload dialog component. */
export const FileUploadDialog = memo(FileUploadDialogComponent);
