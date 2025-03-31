import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectService } from 'src/api/services/projectService';
import { type UserProfile } from 'src/models/userProfile';
import { HandleErrorsService } from 'src/api/services/handleErrorService';

/** 1. */
export const getUserProjects = createAsyncThunk(
  'projects/get',
  async(userProfile: UserProfile, { rejectWithValue }) => {
    try {
      const userProjects = await ProjectService.getUserProjects(userProfile);
      if (userProjects != null) {
        return userProjects;
      }
      return rejectWithValue(null);
    } catch (error: unknown) {
      return rejectWithValue(HandleErrorsService.parseError(error));
    }
  },
);
