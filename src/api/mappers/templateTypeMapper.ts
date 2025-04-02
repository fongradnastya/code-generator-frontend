import { TemplateType } from 'src/models/templateType';

import { TemplateTypeDto } from '../dtos/templateTypeDto';

import { type IMapper } from './mappers';

/** 1. */
class TemplateTypeMapper implements IMapper<TemplateTypeDto, TemplateType> {
  /** @inheritdoc */
  public fromDto(dto: TemplateTypeDto): TemplateType {
    const templateStatusMap: Record<TemplateTypeDto, TemplateType> = {
      [TemplateTypeDto.Django]: TemplateType.Django,
      [TemplateTypeDto.FastApi]: TemplateType.FastApi,
      [TemplateTypeDto.Spring]: TemplateType.Spring,
    };
    return templateStatusMap[dto];
  }

  /** @inheritdoc */
  public toDto(data: TemplateType): TemplateTypeDto {
    const templateStatusMap: Record<TemplateType, TemplateTypeDto> = {
      [TemplateType.Django]: TemplateTypeDto.Django,
      [TemplateType.FastApi]: TemplateTypeDto.FastApi,
      [TemplateType.Spring]: TemplateTypeDto.Spring,
    };
    return templateStatusMap[data];
  }
}

/** 1. */
export const templateTypeMapper = new TemplateTypeMapper();
