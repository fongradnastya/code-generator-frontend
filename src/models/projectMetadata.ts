import { type ProjectType } from './projectType';
import { type ProjectStatus } from './projectStatus';

/** Saved project meta data. */
export type ProjectMetadata = {

  /** Project id. */
  readonly id: number;

  /** Project name. */
  readonly projectName: string;

  /** Project description. */
  readonly projectDescription: string;

  /** Project type. */
  readonly projectType: ProjectType;

  /** 1. */
  readonly projectStatus: ProjectStatus;

  /** Project files. */
  readonly projectFiles: readonly File[];
};
