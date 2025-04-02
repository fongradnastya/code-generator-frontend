import { type TemplateStatusDto } from './templateStatusDto';
import { type TemplateTypeDto } from './templateTypeDto';

/** 1. */
export type TemplateDto = {

  /** 1. */
  readonly template_name: string;

  /** 1. */
  readonly description: string;

  /** 1. */
  readonly template_type: TemplateTypeDto;

  /** 1. */
  readonly status: TemplateStatusDto;

  /** 1. */
  readonly file_name: string;

  /** 1. */
  readonly file_id: string;

  /** 1. */
  readonly created_at: string;
};
