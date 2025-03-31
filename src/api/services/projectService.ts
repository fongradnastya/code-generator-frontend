import { type ProjectUpload } from 'src/models/projectUpload';
import { type UploadResult } from 'src/models/uploadResult';
import { type Project } from 'src/models/project';
import { type UserProfile } from 'src/models/userProfile';

import { type UploadResultDto } from '../dtos/uploadResultDto';
import { type ProjectDto } from '../dtos/projectDto';
import { projectUploadMapper } from '../mappers/projectUploadMapper';
import { uploadResultMapper } from '../mappers/uploadResultMapper';
import { projectMapper } from '../mappers/projectMapper';
import { UserProfileMapper } from '../mappers/userProfileMapper';

import { http } from '../http';

export namespace ProjectService {

  const uploadUrl = 'upload/';

  const projectsUrl = 'user_projects/';

  /**
   * 1.
   * @param project 1.
   */
  export async function uploadProjectForm(project: ProjectUpload): Promise<UploadResult> {
    const projectUploadDto = projectUploadMapper.toDto(project);
    const { data: uploadResultDto } = await http.post<UploadResultDto>(uploadUrl, projectUploadDto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return uploadResultMapper.fromDto(uploadResultDto);
  }

  /**
   * 1.
   * @param userProfile 1.
   */
  export async function getUserProjects(userProfile: UserProfile): Promise<readonly Project[]> {
    const userProfileDto = UserProfileMapper.toDto(userProfile);
    const queryParams = new URLSearchParams(userProfileDto as Record<string, string>).toString();
    const requestUrl = `${projectsUrl}?${queryParams}`;
    const { data: projectsDto } = await http.get<readonly ProjectDto[]>(requestUrl);
    return projectsDto.map(projectDto => projectMapper.fromDto(projectDto));
  }
}
