import { type ProjectType } from './projectType';

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

  /** Project files. */
  readonly projectFiles: readonly File[];
};
