import { createSlice } from '@reduxjs/toolkit';
import { isServerErrorArray } from 'src/utils/typeGuards';

import { getUserProjects } from './dispatchers';
import { initialState } from './state';

/** 1. */
export const userProjectsSlice = createSlice(
  {
    name: 'projects',
    initialState,
    reducers: {
      clearErrors(state) {
        state.error = [];
      },
    },
    extraReducers: builder => builder
      .addCase(getUserProjects.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProjects = [...action.payload];
        state.error = undefined;
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.userProjects = [];
        state.error = isServerErrorArray(action.payload) ? action.payload : [];
      }),
  },
);
