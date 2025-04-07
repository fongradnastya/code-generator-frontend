/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const templatesUrl = 'user-projects/';

  const processTemplateUrl = 'process-template/';

  const downloadUrl = (templateId: string) => `download-template/${templateId}/`;

  const templateJsonUrl = (projectId: string) => `get-template-json/${projectId}/`;

  /**
   * Processes the template with the provided project ID and context data.
   * @param projectId The project ID.
   * @param contextData The context data to be passed for template processing.
   * @returns A Promise that resolves to the processed template (ZIP file in response).
   */
  export async function processTemplate(projectId: string, contextData: any): Promise<void> {
    try {
      const response = await http.post(processTemplateUrl, contextData, {
        params: { project_id: projectId },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/zip' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'processed_template.zip';
      link.click();

      // Clean up the object URL
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error processing the template:', error);
      throw new Error('Failed to process template');
    }
  }

  /**
   * Fetches the template JSON for a given project.
   * @param projectId The project ID to fetch the template JSON for.
   * @returns A Promise that resolves to a JSON object of the template.
   */
  export async function getTemplateJson(projectId: string): Promise<any> {
    try {
      const response = await http.get(templateJsonUrl(projectId));

      // Assuming the response is a valid JSON object
      return response.data;
    } catch (error) {
      console.error('Error fetching template JSON:', error);
      throw new Error('Failed to fetch template JSON');
    }
  }

  /**
   * 1.
   * @param templateId 1.
   * @param fileName 1.
   */
  export async function downloadTemplate(templateId: string): Promise<void> {
    try {
      const response = await http.get<Blob>(downloadUrl(templateId), {
        responseType: 'blob',
      });

      let extractedFileName;

      // Try to extract filename from Content-Disposition header if not provided
      const contentDisposition = response.headers['content-disposition'];

      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches?.[1]) {
          extractedFileName = matches[1];
        }
      }

      // Default to a generic filename if extraction fails
      extractedFileName = extractedFileName ?? `download_${templateId}`;

      // Create a temporary URL for the file
      const fileURL = window.URL.createObjectURL(response.data);

      // Use an anchor tag but don't append it to the DOM
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = extractedFileName;

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
