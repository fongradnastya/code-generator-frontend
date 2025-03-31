import { createSlice } from '@reduxjs/toolkit';
import { isServerErrorArray } from 'src/utils/typeGuards';

import { uploadProject } from './dispatchers';
import { initialState } from './state';

/** 1. */
export const projectUploadSlice = createSlice(
  {
    name: 'projectUpload',
    initialState,
    reducers: {
      clearErrors(state) {
        state.error = [];
      },
    },
    extraReducers: builder => builder
      .addCase(uploadProject.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadResult = action.payload;
        state.error = undefined;
      })
      .addCase(uploadProject.rejected, (state, action) => {
        state.isLoading = false;
        state.uploadResult = undefined;
        state.error = isServerErrorArray(action.payload) ? action.payload : [];
      }),
  },
);
