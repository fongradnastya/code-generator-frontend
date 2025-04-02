import { type TemplateType } from './templateType';
import { type TemplateStatus } from './templateStatus';

/** Configured template info. */
export type Template = {

  /** Template id. */
  readonly templateId: string;

  /** Template name. */
  readonly templateName: string;

  /** 1. */
  readonly description: string;

  /** Template creation date. */
  readonly creationDate: Date;

  /** Template type. */
  readonly templateType: TemplateType;

  /** Template status. */
  readonly templateStatus: TemplateStatus;

  /** 1. */
  readonly fileName: string;
};
