import { createComposeActionFn } from 'src/utils/createComposeAction';
import { type User } from 'src/models/user';
import { type AppError } from 'src/models/appError';

export namespace UserActions {
  const composeAction = createComposeActionFn('user');

  /** Dispatcher to get user. */
  export const get = composeAction('get');

  /** Dispatcher to get success. */
  export const getSuccess = composeAction<User>('getSuccess');

  /** Dispatcher to get failure. */
  export const getFailure = composeAction<AppError>('getFailure');

  /** Dispatcher to remove user. */
  export const remove = composeAction('remove');
}
