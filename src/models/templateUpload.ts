import { type TemplateStatus } from './templateStatus';
import { type TemplateType } from './templateType';

/** 1. */
export type TemplateUpload = {

  /** 1. */
  readonly templateName: string;

  /** 1. */
  readonly templateDescription: string;

  /** 1. */
  readonly templateType: TemplateType;

  /** 1. */
  readonly templateStatus: TemplateStatus;

  /** 1. */
  readonly templateFiles?: File;
};
