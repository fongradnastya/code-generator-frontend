import { type TemplateUpload } from 'src/models/templateUpload';

import { type TemplateUploadDto } from '../dtos/templateUploadDto';

import { templateTypeMapper } from './templateTypeMapper';
import { templateStatusMapper } from './templateStatusMapper';
import { type IMapper } from './mappers';

/** 1. */
class TemplateUploadMapper implements IMapper<TemplateUploadDto, TemplateUpload> {

  /** @inheritdoc */
  public fromDto(dto: TemplateUploadDto): TemplateUpload {
    return {
      templateName: dto.project_name,
      templateDescription: dto.description,
      templateStatus: templateStatusMapper.fromDto(dto.status),
      templateType: templateTypeMapper.fromDto(dto.project_type),
      templateFiles: dto.file,
      jsonFile: dto.json_file,
    };
  }

  /** @inheritdoc */
  public toDto(data: TemplateUpload): TemplateUploadDto {
    return {
      project_name: data.templateName,
      description: data.templateDescription,
      project_type: templateTypeMapper.toDto(data.templateType),
      status: templateStatusMapper.toDto(data.templateStatus),
      file: data.templateFiles,
      json_file: data.jsonFile,
    };
  }
}

/** 1. */
export const templateUploadMapper = new TemplateUploadMapper();
