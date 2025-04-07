import { type TemplateTypeDto } from './templateTypeDto';
import { type TemplateStatusDto } from './templateStatusDto';

/** 1. */
export type TemplateUploadDto = {

  /** 1. */
  readonly project_name: string;

  /** 1. */
  readonly description: string;

  /** 1. */
  readonly project_type: TemplateTypeDto;

  /** 1. */
  readonly status: TemplateStatusDto;

  /** 1. */
  readonly file?: File;

  /** 1. */
  readonly json_file?: File;
};
