import { type ProjectTypeDto } from './projectTypeDto';
import { type ProjectStatusDto } from './projectStatusDto';

/** 1. */
export type ProjectUploadDto = {

  /** 1. */
  readonly project_name: string;

  /** 1. */
  readonly description: string;

  /** 1. */
  readonly project_type: ProjectTypeDto;

  /** 1. */
  readonly status: ProjectStatusDto;

  /** 1. */
  readonly file?: File;
};
