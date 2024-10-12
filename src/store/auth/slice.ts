import { createSlice } from '@reduxjs/toolkit';

import { AuthActions } from './dispatchers';
import { authInitialState } from './state';

/** Auth slice. */
export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AuthActions.login, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AuthActions.loginSuccess, state => {
      state.isLoading = false;
    })
    .addCase(AuthActions.loginFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(AuthActions.logout, state => {
      state.isLoading = true;
    })
    .addCase(AuthActions.logoutSuccess, state => {
      state.isLoading = false;
    })
    .addCase(AuthActions.logoutFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(AuthActions.reset, state => {
      state.error = undefined;
      state.isLoading = false;
    }),
});
