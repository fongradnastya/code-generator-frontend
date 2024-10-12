import { createComposeActionFn } from 'src/utils/createComposeAction';
import { type AppError } from 'src/models/appError';
import { type Login } from 'src/models/loginValues';

export namespace AuthActions {
  const composeAction = createComposeActionFn('auth');

  /** Dispatcher to login. */
  export const login = composeAction<Login>('login');

  /** Dispatcher to login success. */
  export const loginSuccess = composeAction('loginSuccess');

  /** Dispatcher to login failure. */
  export const loginFailure = composeAction<AppError<Login>>('loginFailure');

  /** Dispatcher to logout. */
  export const logout = composeAction('logout');

  /** Dispatcher to success. */
  export const logoutSuccess = composeAction('logoutSuccess');

  /** Dispatcher to failure. */
  export const logoutFailure = composeAction<AppError>('logoutFailure');

  /** Dispatcher to reset. */
  export const reset = composeAction('reset');
}
