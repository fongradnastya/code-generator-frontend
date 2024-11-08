import { type ProjectType } from './projectType';
import { type ProjectStatus } from './projectStatus';

/** Configured project info. */
export type Project = {

  /** Project id. */
  readonly id: number;

  /** Project name. */
  readonly projectName: string;

  /** Project creation date. */
  readonly creationDate: Date;

  /** Project language. */
  readonly projectLanguage: string;

  /** Project type. */
  readonly projectType: ProjectType;

  /** Project status. */
  readonly status: ProjectStatus;
};
