import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** Selects an authorization error. */
export const selectUploadError = createSelector(
  (state: RootState) => state.projectUpload.error,
  error => error,
);

/** Selects authorization loading state. */
export const selectProjectLoading = createSelector(
  (state: RootState) => state.projectUpload.isLoading,
  isLoading => isLoading,
);
