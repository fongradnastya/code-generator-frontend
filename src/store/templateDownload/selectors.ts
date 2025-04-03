import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** Selects an authorization error. */
export const selectDownloadError = createSelector(
  (state: RootState) => state.templateDownload.error,
  error => error,
);

/** Selects authorization loading state. */
export const selectDownloadLoading = createSelector(
  (state: RootState) => state.templateDownload.isLoading,
  isLoading => isLoading,
);
