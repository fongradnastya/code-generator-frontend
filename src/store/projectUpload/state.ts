import { type UploadResult } from 'src/models/uploadResult';
import { type ServerError } from 'src/models/serverError';

/** 1. */
export type ProjectUploadState = {

  /** 1. */
  readonly uploadResult?: UploadResult;

  /** Error. */
  readonly error?: ServerError[];

  /** Whether authorization is loading or not. */
  readonly isLoading: boolean;
};

/** 1. */
export const initialState: ProjectUploadState = {
  isLoading: false,
};
