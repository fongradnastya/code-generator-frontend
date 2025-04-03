import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateService } from 'src/api/services/templateService';
import { HandleErrorsService } from 'src/api/services/handleErrorService';

/** 1. */
export const downloadTemplate = createAsyncThunk(
  'template/download',
  async(templateId: string, { rejectWithValue }) => {
    try {
      const uploadResult = await TemplateService.downloadTemplate(templateId);
      return uploadResult;
    } catch (error: unknown) {
      return rejectWithValue(HandleErrorsService.parseError(error));
    }
  },
);
