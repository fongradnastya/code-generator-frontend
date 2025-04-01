import { type Project } from 'src/models/project';

import { type ProjectDto } from '../dtos/projectDto';

import { projectTypeMapper } from './projectTypeMapper';
import { projectStatusMapper } from './projectStatusMapper';
import { type IMapper } from './mappers';

/** 1. */
class ProjectMapper implements IMapper<ProjectDto, Project> {

  /** @inheritdoc */
  public fromDto(dto: ProjectDto): Project {
    return {
      projectName: dto.project_name,
      description: dto.description,
      projectStatus: projectStatusMapper.fromDto(dto.status),
      projectType: projectTypeMapper.fromDto(dto.project_type),
      projectId: dto.file_id,
      fileName: dto.file_name,
      creationDate: new Date(dto.created_at),
    };
  }

  /** @inheritdoc */
  public toDto(data: Project): ProjectDto {
    return {
      project_name: data.projectName,
      description: data.description,
      project_type: projectTypeMapper.toDto(data.projectType),
      status: projectStatusMapper.toDto(data.projectStatus),
      file_id: data.projectId,
      file_name: data.fileName,
      created_at: data.creationDate.toUTCString(),
    };
  }
}

/** 1. */
export const projectMapper = new ProjectMapper();
