import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectService } from 'src/api/services/projectService';
import { type ProjectUpload } from 'src/models/projectUpload';
import { HandleErrorsService } from 'src/api/services/handleErrorService';

/** 1. */
export const uploadProject = createAsyncThunk(
  'project/upload',
  async(project: ProjectUpload, { rejectWithValue }) => {
    try {
      const uploadResult = await ProjectService.uploadProjectForm(project);
      if (uploadResult != null) {
        return uploadResult;
      }
      return rejectWithValue(null);
    } catch (error: unknown) {
      return rejectWithValue(HandleErrorsService.parseError(error));
    }
  },
);
