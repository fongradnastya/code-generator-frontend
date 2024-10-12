import { type AppError } from 'src/models/appError';
import { type User } from 'src/models/user';

/** User state. */
export type UserState = {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;

  /** User. */
  readonly user: User | null;
};

/** Initial user state. */
export const userInitialState: UserState = {
  isLoading: false,
  user: null,
};
