import { ProjectStatus } from 'src/models/projectStatus';

import { ProjectStatusDto } from '../dtos/projectStatusDto';

import { type IMapper } from './mappers';

/** 1. */
class ProjectStatusMapper implements IMapper<ProjectStatusDto, ProjectStatus> {

  /** @inheritdoc */
  public fromDto(dto: ProjectStatusDto): ProjectStatus {
    const projectStatusMap: Record<ProjectStatusDto, ProjectStatus> = {
      [ProjectStatusDto.Build]: ProjectStatus.Build,
      [ProjectStatusDto.Cancelled]: ProjectStatus.Cancelled,
      [ProjectStatusDto.Draft]: ProjectStatus.Draft,
      [ProjectStatusDto.Suggested]: ProjectStatus.Suggested,
    };
    return projectStatusMap[dto];
  }

  /** @inheritdoc */
  public toDto(data: ProjectStatus): ProjectStatusDto {
    const projectStatusMap: Record<ProjectStatus, ProjectStatusDto> = {
      [ProjectStatus.Build]: ProjectStatusDto.Build,
      [ProjectStatus.Cancelled]: ProjectStatusDto.Cancelled,
      [ProjectStatus.Draft]: ProjectStatusDto.Draft,
      [ProjectStatus.Suggested]: ProjectStatusDto.Suggested,
    };
    return projectStatusMap[data];
  }
}

/** 1. */
export const projectStatusMapper = new ProjectStatusMapper();
