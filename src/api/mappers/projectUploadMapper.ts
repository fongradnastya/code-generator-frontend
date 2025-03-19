import { type ProjectUpload } from 'src/models/projectUpload';

import { type ProjectUploadDto } from '../dtos/projectUploadDto';

import { projectTypeMapper } from './projectTypeMapper';
import { projectStatusMapper } from './projectStatusMapper';
import { type IMapper } from './mappers';

/** 1. */
class ProjectUploadMapper implements IMapper<ProjectUploadDto, ProjectUpload> {

  /** @inheritdoc */
  public fromDto(dto: ProjectUploadDto): ProjectUpload {
    return {
      projectName: dto.project_name,
      projectDescription: dto.description,
      projectStatus: projectStatusMapper.fromDto(dto.status),
      projectType: projectTypeMapper.fromDto(dto.project_type),
      projectFiles: dto.file,
    };
  }

  /** @inheritdoc */
  public toDto(data: ProjectUpload): ProjectUploadDto {
    return {
      project_name: data.projectName,
      description: data.projectDescription,
      project_type: projectTypeMapper.toDto(data.projectType),
      status: projectStatusMapper.toDto(data.projectStatus),
      file: data.projectFiles,
    };
  }
}

/** 1. */
export const projectUploadMapper = new ProjectUploadMapper();
