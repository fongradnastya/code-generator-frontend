import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** Selects an authorization error. */
export const selectProjectsError = createSelector(
  (state: RootState) => state.projects.error,
  error => error,
);

/** Selects authorization loading state. */
export const selectProjectsLoading = createSelector(
  (state: RootState) => state.projects.isLoading,
  isLoading => isLoading,
);

/** 1. */
export const selectUserProjects = createSelector(
  (state: RootState) => state.projects.userProjects,
  userProjects => userProjects,
);
