import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/api/services/authService';
import { type Login } from 'src/models/login';
import { type Registration } from 'src/models/registration';
import { HandleErrorsService } from 'src/api/services/handleErrorService';

/** Async thunk action for user login. */
export const loginUser = createAsyncThunk(
  'user/login',
  async(loginData: Login, { rejectWithValue }) => {
    try {
      const authToken = await AuthService.login(loginData);
      if (authToken) {
        return authToken;
      }
      return rejectWithValue(null);
    } catch (error: unknown) {
      return rejectWithValue(HandleErrorsService.parseError(error));
    }
  },
);

/** Async thunk action for user registration. */
export const registerUser = createAsyncThunk(
  'user/register',
  async(registrationData: Registration, { rejectWithValue }) => {
    try {
      await AuthService.register(registrationData);
      return null;
    } catch (error: unknown) {
      return rejectWithValue(HandleErrorsService.parseError(error));
    }
  },
);
