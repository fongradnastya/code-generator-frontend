import { ProjectType } from 'src/models/projectType';

import { ProjectTypeDto } from '../dtos/projectTypeDto';

import { type IMapper } from './mappers';

/** 1. */
class ProjectTypeMapper implements IMapper<ProjectTypeDto, ProjectType> {
  /** @inheritdoc */
  public fromDto(dto: ProjectTypeDto): ProjectType {
    const projectStatusMap: Record<ProjectTypeDto, ProjectType> = {
      [ProjectTypeDto.Django]: ProjectType.Django,
      [ProjectTypeDto.FastApi]: ProjectType.FastApi,
      [ProjectTypeDto.Spring]: ProjectType.Spring,
    };
    return projectStatusMap[dto];
  }

  /** @inheritdoc */
  public toDto(data: ProjectType): ProjectTypeDto {
    const projectStatusMap: Record<ProjectType, ProjectTypeDto> = {
      [ProjectType.Django]: ProjectTypeDto.Django,
      [ProjectType.FastApi]: ProjectTypeDto.FastApi,
      [ProjectType.Spring]: ProjectTypeDto.Spring,
    };
    return projectStatusMap[data];
  }
}

/** 1. */
export const projectTypeMapper = new ProjectTypeMapper();
