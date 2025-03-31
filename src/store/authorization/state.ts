import { type ServerError } from 'src/models/serverError';

/** Anime state. */
export type AuthorizationState = {

  /** Error. */
  readonly error?: ServerError[];

  /** Whether authorization is loading or not. */
  readonly isLoading: boolean;

  /** Logged-in user's email. */
  readonly email: string | null;
};

/** Initial state for the anime slice of the Redux store. */
export const initialState: AuthorizationState = {
  isLoading: false,
  email: null,
};
