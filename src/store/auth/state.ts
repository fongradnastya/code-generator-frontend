import { type AppError } from 'src/models/appError';
import { type Login } from 'src/models/loginValues';

/** Auth state. */
export type AuthState = {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError<Login>;

};

/** Auth initial state. */
export const authInitialState: AuthState = {
  isLoading: false,
};
