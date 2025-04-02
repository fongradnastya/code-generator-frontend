import { type TemplateUpload } from 'src/models/templateUpload';
import { type UploadResult } from 'src/models/uploadResult';
import { type Template } from 'src/models/template';
import { type UserProfile } from 'src/models/userProfile';

import { type UploadResultDto } from '../dtos/uploadResultDto';
import { type TemplateDto } from '../dtos/templateDto';
import { templateUploadMapper } from '../mappers/templateUploadMapper';
import { uploadResultMapper } from '../mappers/uploadResultMapper';
import { templateMapper } from '../mappers/templateMapper';
import { UserProfileMapper } from '../mappers/userProfileMapper';

import { http } from '../http';

export namespace TemplateService {

  const uploadUrl = 'upload-template/';

  const templatesUrl = 'user-templates/';

  const downloadUrl = (templateId: string) => `download/${templateId}/`;

  /**
   * 1.
   * @param templateId 1.
   * @param fileName 1.
   */
  export async function downloadTemplate(templateId: string, fileName: string): Promise<void> {
    try {
      const { data } = await http.get<Blob>(downloadUrl(templateId), {
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
   * @param template 1.
   */
  export async function uploadTemplateForm(template: TemplateUpload): Promise<UploadResult> {
    const templateUploadDto = templateUploadMapper.toDto(template);
    const { data: uploadResultDto } = await http.post<UploadResultDto>(uploadUrl, templateUploadDto, {
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
  export async function getUserTemplates(userProfile: UserProfile): Promise<readonly Template[]> {
    const userProfileDto = UserProfileMapper.toDto(userProfile);
    const requestUrl = `${templatesUrl}${userProfileDto.email}/`;
    const { data: templatesDto } = await http.get<readonly TemplateDto[]>(requestUrl);
    return templatesDto.map(templateDto => templateMapper.fromDto(templateDto));
  }
}
