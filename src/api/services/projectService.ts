import { type ProjectUpload } from 'src/models/projectUpload';
import { type UploadResult } from 'src/models/uploadResult';

import { type UploadResultDto } from '../dtos/uploadResultDto';
import { projectUploadMapper } from '../mappers/projectUploadMapper';
import { uploadResultMapper } from '../mappers/uploadResultMapper';

import { http } from '../http';

export namespace ProjectService {

  const uploadUrl = 'upload/';

  /**
   * 1.
   * @param project 1.
   */
  export async function uploadProjectForm(project: ProjectUpload): Promise<UploadResult> {
    const projectUploadDto = projectUploadMapper.toDto(project);
    const { data: uploadResultDto } = await http.post<UploadResultDto>(uploadUrl, projectUploadDto);
    return uploadResultMapper.fromDto(uploadResultDto);
  }
}
