import { type FC, memo } from 'react';
import { useFileUpload } from 'src/components/FileUploader/useFileUpload';
import { type FileUploadStatus } from 'src/models/fileUploadStatus';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import clsx from 'clsx';

import styles from './FileUploader.module.css';

type Props = {

  /** Sets a file upload status. */
  readonly onStatusChange: (newStatus: FileUploadStatus) => void;

  /** Sets new files. */
  readonly onFilesChange: (newFiles: readonly File[]) => void;
};

const FileUploaderComponent: FC<Props> = ({ onStatusChange, onFilesChange }) => {
  const {
    isDragging,
    fileInputRef,
    handleDrop,
    handleFileSelect,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleClick,
  } = useFileUpload(onStatusChange, onFilesChange);

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={clsx(styles.dropzone, { [styles.dragging]: isDragging })}
    >
      <input
        type="file"
        onChange={handleFileSelect}
        ref={fileInputRef}
        className={styles.input}
      />
      <p>Drag and drop your file here, or click to select a file</p>
      <DriveFolderUploadIcon
        color="primary"
        fontSize="large"
      />
    </div>
  );
};

/** File uploader component. */
export const FileUploader = memo(FileUploaderComponent);
