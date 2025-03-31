import { type ProjectType } from './projectType';
import { type ProjectStatus } from './projectStatus';

/** Configured project info. */
export type Project = {

  /** Project id. */
  readonly projectId: string;

  /** Project name. */
  readonly projectName: string;

  /** 1. */
  readonly description: string;

  /** Project creation date. */
  readonly creationDate: Date;

  /** Project type. */
  readonly projectType: ProjectType;

  /** Project status. */
  readonly projectStatus: ProjectStatus;

  /** 1. */
  readonly fileName: string;
};
