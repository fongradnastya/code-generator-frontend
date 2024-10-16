import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

/** Selects the drawer open state from the store. */
export const selectIsDrawerOpen = createSelector(
  (state: RootState) => state.drawer.open,
  open => open,
);
