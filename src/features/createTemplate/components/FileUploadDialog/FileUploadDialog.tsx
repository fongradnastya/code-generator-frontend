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

type Props = {

  /** 1. */
  readonly uploadedFiles: {

    /** 1. */
    zip?: File | null;

    /** 1. */
    json?: File | null;
  };

  /** 1. */
  readonly onZipFileUpload: (file: File) => void;

  /** 1. */
  readonly onJsonFileUpload: (file: File) => void;

  /** 1. */
  readonly onFileDelete: (file: File) => void;

  /** 1. */
  readonly isFileDialogOpen: boolean;

  /** 1. */
  readonly onFileDialogClose: () => void;
};

const FileUploadDialogComponent: FC<Props> = ({
  isFileDialogOpen,
  uploadedFiles,
  onFileDialogClose,
  onZipFileUpload,
  onJsonFileUpload,
  onFileDelete,
}) => {
  const [fileUploadStatus, setFileUploadStatus] = useState(FileUploadStatus.Empty);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<AlertMessage | null>();

  const handleSnackbarClose = useCallback(() => {
    setIsSnackbarOpen(false);
    setSnackbarMessage(null);
  }, [setIsSnackbarOpen]);

  const displaySnackbarMessage = useCallback((message: string, severity: MessageSeverity) => {
    setSnackbarMessage({
      message,
      severity,
    });
    setIsSnackbarOpen(true);
  }, [setSnackbarMessage, setIsSnackbarOpen]);

  const handleFileUpload = useCallback(() => {
    if (uploadedFiles.zip && uploadedFiles.json) {
      onFileDialogClose();
      setFileUploadStatus(FileUploadStatus.Accept);
    } else {
      displaySnackbarMessage('Both ZIP and JSON files must be uploaded.', MessageSeverity.Error);
    }
  }, [displaySnackbarMessage, onFileDialogClose, uploadedFiles]);

  useEffect(() => {
    if (fileUploadStatus === FileUploadStatus.Reject) {
      displaySnackbarMessage('Error in file format.', MessageSeverity.Error);
    } else if (fileUploadStatus === FileUploadStatus.Accept) {
      displaySnackbarMessage('Files successfully uploaded.', MessageSeverity.Success);
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
        <DialogTitle className={styles.dialogTitle}>
          Upload Template Files
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <div className={styles.uploadContainer}>
            <FileUploader
              onFilesChange={files => onZipFileUpload(files[0])}
              onStatusChange={setFileUploadStatus}
              fileFormat=".zip"
            />
            {uploadedFiles.zip && (
              <Chip
                label={uploadedFiles.zip.name}
                onDelete={() => uploadedFiles.zip ? onFileDelete(uploadedFiles.zip) : null}
                color="primary"
              />
            )}
          </div>
          <div className={styles.uploadContainer}>
            <FileUploader
              onFilesChange={files => onJsonFileUpload(files[0])}
              onStatusChange={setFileUploadStatus}
              fileFormat=".json"
            />
            {uploadedFiles.json && (
              <Chip
                label={uploadedFiles.json.name}
                onDelete={() => uploadedFiles.json ? onFileDelete(uploadedFiles.json) : null}
                color="primary"
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onFileDialogClose}>Cancel</Button>
          <Button onClick={handleFileUpload} variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {snackbarMessage && (
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

/** 1. */
export const FileUploadDialog = memo(FileUploadDialogComponent);
