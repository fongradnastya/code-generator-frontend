import { type ProjectStatusDto } from './projectStatusDto';
import { type ProjectTypeDto } from './projectTypeDto';

/** 1. */
export type ProjectDto = {

  /** 1. */
  readonly project_name: string;

  /** 1. */
  readonly description: string;

  /** 1. */
  readonly project_type: ProjectTypeDto;

  /** 1. */
  readonly status: ProjectStatusDto;

  /** 1. */
  readonly file_name: string;

  /** 1. */
  readonly file_id: string;

  /** 1. */
  readonly created_at: string;
};
