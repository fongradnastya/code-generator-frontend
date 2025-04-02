import { type Template } from 'src/models/template';
import { type ServerError } from 'src/models/serverError';

/** 1. */
export type UserTemplatesState = {

  /** 1. */
  readonly userTemplates: readonly Template[];

  /** Error. */
  readonly error?: ServerError[];

  /** Whether authorization is loading or not. */
  readonly isLoading: boolean;
};

/** 1. */
export const initialState: UserTemplatesState = {
  userTemplates: [] as Template[],
  isLoading: false,
};
