import { type Template } from 'src/models/template';

import { type TemplateDto } from '../dtos/templateDto';

import { templateTypeMapper } from './templateTypeMapper';
import { templateStatusMapper } from './templateStatusMapper';
import { type IMapper } from './mappers';

/** 1. */
class TemplateMapper implements IMapper<TemplateDto, Template> {

  /** @inheritdoc */
  public fromDto(dto: TemplateDto): Template {
    return {
      templateName: dto.project_name,
      description: dto.description,
      templateStatus: templateStatusMapper.fromDto(dto.status),
      templateType: templateTypeMapper.fromDto(dto.project_type),
      templateId: dto.file_id,
      fileName: dto.file_name,
      creationDate: new Date(dto.created_at),
    };
  }

  /** @inheritdoc */
  public toDto(data: Template): TemplateDto {
    return {
      project_name: data.templateName,
      description: data.description,
      project_type: templateTypeMapper.toDto(data.templateType),
      status: templateStatusMapper.toDto(data.templateStatus),
      file_id: data.templateId,
      file_name: data.fileName,
      created_at: data.creationDate.toUTCString(),
    };
  }
}

/** 1. */
export const templateMapper = new TemplateMapper();
