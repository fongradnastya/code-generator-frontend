import { createSlice } from '@reduxjs/toolkit';
import { isServerErrorArray } from 'src/utils/typeGuards';

import { loginUser, registerUser } from './dispatchers';
import { initialState } from './state';

/** Slice of the Redux store for managing user authorization data. */
export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = [];
    },
  },
  extraReducers: builder => builder
    .addCase(loginUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.email = action.meta.arg.email;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = isServerErrorArray(action.payload) ? action.payload : [];
      state.email = null;
    })
    .addCase(registerUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, _action) => {
      state.isLoading = false;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = isServerErrorArray(action.payload) ? action.payload : [];
    }),
});

/** Clears server errors. */
export const { clearErrors } = authorizationSlice.actions;
