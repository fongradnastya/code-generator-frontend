import { type TemplateTypeDto } from './templateTypeDto';
import { type TemplateStatusDto } from './templateStatusDto';

/** 1. */
export type TemplateUploadDto = {

  /** 1. */
  readonly template_name: string;

  /** 1. */
  readonly description: string;

  /** 1. */
  readonly template_type: TemplateTypeDto;

  /** 1. */
  readonly status: TemplateStatusDto;

  /** 1. */
  readonly file?: File;
};
