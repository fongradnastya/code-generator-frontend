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

  const uploadUrl = 'upload-template/';

  const projectsUrl = 'user-projects/';

  const downloadUrl = (projectId: string) => `download/${projectId}/`;

  /**
   * 1.
   * @param projectId 1.
   * @param fileName 1.
   */
  export async function downloadProject(projectId: string, fileName: string): Promise<void> {
    try {
      const { data } = await http.get<Blob>(downloadUrl(projectId), {
        responseType: 'blob',
      });

      // Create a temporary URL for the file
      const fileURL = window.URL.createObjectURL(new Blob([data]));

      // Use an anchor tag but don't append it to the DOM
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = fileName;

      // Trigger the download by simulating a click
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  }

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
