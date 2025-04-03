import { type ServerError } from 'src/models/serverError';

/** 1. */
export type TemplateDownloadState = {

  /** Error. */
  readonly error?: ServerError[];

  /** Whether authorization is loading or not. */
  readonly isLoading: boolean;
};

/** 1. */
export const initialState: TemplateDownloadState = {
  isLoading: false,
};
