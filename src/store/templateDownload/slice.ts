import { createSlice } from '@reduxjs/toolkit';
import { isServerErrorArray } from 'src/utils/typeGuards';

import { downloadTemplate } from './dispatchers';
import { initialState } from './state';

/** 1. */
export const templateDownloadSlice = createSlice(
  {
    name: 'templateDownload',
    initialState,
    reducers: {
      clearErrors(state) {
        state.error = [];
      },
    },
    extraReducers: builder => builder
      .addCase(downloadTemplate.pending, state => {
        state.isLoading = true;
      })
      .addCase(downloadTemplate.fulfilled, state => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(downloadTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = isServerErrorArray(action.payload) ? action.payload : [];
      }),
  },
);
