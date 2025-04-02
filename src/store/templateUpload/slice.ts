import { createSlice } from '@reduxjs/toolkit';
import { isServerErrorArray } from 'src/utils/typeGuards';

import { uploadTemplate } from './dispatchers';
import { initialState } from './state';

/** 1. */
export const templateUploadSlice = createSlice(
  {
    name: 'templateUpload',
    initialState,
    reducers: {
      clearErrors(state) {
        state.error = [];
      },
    },
    extraReducers: builder => builder
      .addCase(uploadTemplate.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadResult = action.payload;
        state.error = undefined;
      })
      .addCase(uploadTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.uploadResult = undefined;
        state.error = isServerErrorArray(action.payload) ? action.payload : [];
      }),
  },
);
