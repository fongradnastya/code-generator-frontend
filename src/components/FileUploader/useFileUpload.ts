import { useState, useCallback, useRef, type DragEvent, type ChangeEvent } from 'react';
import { FileUploadStatus } from 'src/models/fileUploadStatus';

/**
 * File upload hook.
 * @param onStatusChange Sets files state.
 * @param onFilesChange Sets files state.
 */
export const useFileUpload = (
  onStatusChange: (status: FileUploadStatus) => void,
  onFilesChange: (files: readonly File[]) => void,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback((files: readonly File[]) => {
    const csvFiles = files.filter(file => file.type === 'text/csv');
    if (csvFiles.length !== files.length) {
      onStatusChange(FileUploadStatus.Reject);
    } else {
      onStatusChange(FileUploadStatus.Accept);
      onFilesChange(csvFiles);
    }
  }, [onStatusChange, onFilesChange]);

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files ?? []);
    loadFiles(files);
  }, [setIsDragging, loadFiles]);

  const handleFileSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    loadFiles(files);
  }, [loadFiles]);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  return {
    isDragging,
    fileInputRef,
    handleDrop,
    handleFileSelect,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleClick,
  };
};
