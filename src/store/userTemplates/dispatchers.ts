import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateService } from 'src/api/services/templateService';
import { type UserProfile } from 'src/models/userProfile';
import { HandleErrorsService } from 'src/api/services/handleErrorService';

/** 1. */
export const getUserTemplates = createAsyncThunk(
  'templates/get',
  async(userProfile: UserProfile, { rejectWithValue }) => {
    try {
      const userTemplates = await TemplateService.getUserTemplates(userProfile);
      if (userTemplates != null) {
        return userTemplates;
      }
      return rejectWithValue(null);
    } catch (error: unknown) {
      return rejectWithValue(HandleErrorsService.parseError(error));
    }
  },
);
