import { type UploadResult } from 'src/models/uploadResult';

import { type UploadResultDto } from '../dtos/uploadResultDto';

import { type IMapper } from './mappers';

/** 1. */
class UploadResultMapper implements IMapper<UploadResultDto, UploadResult> {

  /** @inheritdoc */
  public fromDto(dto: UploadResultDto): UploadResult {
    return {
      fileId: dto.file_id,
      fileName: dto.file_name,
      templateId: dto.template_id,
    };
  }

  /** @inheritdoc */
  public toDto(data: UploadResult): UploadResultDto {
    return {
      file_id: data.fileId,
      file_name: data.fileName,
      template_id: data.templateId,
    };
  }
}

/** 1. */
export const uploadResultMapper = new UploadResultMapper();
