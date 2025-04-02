import { createSlice } from '@reduxjs/toolkit';
import { isServerErrorArray } from 'src/utils/typeGuards';

import { getUserTemplates } from './dispatchers';
import { initialState } from './state';

/** 1. */
export const userTemplatesSlice = createSlice(
  {
    name: 'templates',
    initialState,
    reducers: {
      clearErrors(state) {
        state.error = [];
      },
    },
    extraReducers: builder => builder
      .addCase(getUserTemplates.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTemplates = [...action.payload];
        state.error = undefined;
      })
      .addCase(getUserTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.userTemplates = [];
        state.error = isServerErrorArray(action.payload) ? action.payload : [];
      }),
  },
);
