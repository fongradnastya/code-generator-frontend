import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateService } from 'src/api/services/templateService';
import { type TemplateUpload } from 'src/models/templateUpload';
import { HandleErrorsService } from 'src/api/services/handleErrorService';

/** 1. */
export const uploadTemplate = createAsyncThunk(
  'template/upload',
  async(template: TemplateUpload, { rejectWithValue }) => {
    try {
      const uploadResult = await TemplateService.uploadTemplateForm(template);
      if (uploadResult != null) {
        return uploadResult;
      }
      return rejectWithValue(null);
    } catch (error: unknown) {
      return rejectWithValue(HandleErrorsService.parseError(error));
    }
  },
);
