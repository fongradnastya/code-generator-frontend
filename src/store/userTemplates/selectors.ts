import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** Selects an authorization error. */
export const selectTemplatesError = createSelector(
  (state: RootState) => state.templates.error,
  error => error,
);

/** Selects authorization loading state. */
export const selectTemplatesLoading = createSelector(
  (state: RootState) => state.templates.isLoading,
  isLoading => isLoading,
);

/** 1. */
export const selectUserTemplates = createSelector(
  (state: RootState) => state.templates.userTemplates,
  userTemplates => userTemplates,
);
