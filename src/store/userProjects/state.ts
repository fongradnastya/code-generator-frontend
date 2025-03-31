import { type Project } from 'src/models/project';
import { type ServerError } from 'src/models/serverError';

/** 1. */
export type UserProjectsState = {

  /** 1. */
  readonly userProjects: readonly Project[];

  /** Error. */
  readonly error?: ServerError[];

  /** Whether authorization is loading or not. */
  readonly isLoading: boolean;
};

/** 1. */
export const initialState: UserProjectsState = {
  userProjects: [] as Project[],
  isLoading: false,
};
