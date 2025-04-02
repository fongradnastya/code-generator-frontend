import { TemplateStatus } from 'src/models/templateStatus';

import { TemplateStatusDto } from '../dtos/templateStatusDto';

import { type IMapper } from './mappers';

/** 1. */
class TemplateStatusMapper implements IMapper<TemplateStatusDto, TemplateStatus> {

  /** @inheritdoc */
  public fromDto(dto: TemplateStatusDto): TemplateStatus {
    const templateStatusMap: Record<TemplateStatusDto, TemplateStatus> = {
      [TemplateStatusDto.Build]: TemplateStatus.Build,
      [TemplateStatusDto.Cancelled]: TemplateStatus.Cancelled,
      [TemplateStatusDto.Draft]: TemplateStatus.Draft,
      [TemplateStatusDto.Suggested]: TemplateStatus.Suggested,
    };
    return templateStatusMap[dto];
  }

  /** @inheritdoc */
  public toDto(data: TemplateStatus): TemplateStatusDto {
    const templateStatusMap: Record<TemplateStatus, TemplateStatusDto> = {
      [TemplateStatus.Build]: TemplateStatusDto.Build,
      [TemplateStatus.Cancelled]: TemplateStatusDto.Cancelled,
      [TemplateStatus.Draft]: TemplateStatusDto.Draft,
      [TemplateStatus.Suggested]: TemplateStatusDto.Suggested,
    };
    return templateStatusMap[data];
  }
}

/** 1. */
export const templateStatusMapper = new TemplateStatusMapper();
