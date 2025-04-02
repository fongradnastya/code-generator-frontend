import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** Selects an authorization error. */
export const selectUploadError = createSelector(
  (state: RootState) => state.templateUpload.error,
  error => error,
);

/** Selects authorization loading state. */
export const selectTemplateLoading = createSelector(
  (state: RootState) => state.templateUpload.isLoading,
  isLoading => isLoading,
);
