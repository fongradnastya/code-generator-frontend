import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** User selector. */
export const selectUser = createSelector(
  (state: RootState) => state.user.user,
  user => user,
);

/** Is user loading selector. */
export const selectIsUserLoading = createSelector(
  (state: RootState) => state.user.isLoading,
  isLoading => isLoading,
);
