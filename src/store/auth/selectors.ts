import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** Is auth loading selector. */
export const selectAuthIsLoading = createSelector((state: RootState) => state.auth.isLoading, isLoading => isLoading);

/** Auth error selector. */
export const selectAuthError = createSelector((state: RootState) => state.auth.error, error => error);
