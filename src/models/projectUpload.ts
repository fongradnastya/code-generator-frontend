import { type ProjectStatus } from './projectStatus';
import { type ProjectType } from './projectType';

/** 1. */
export type ProjectUpload = {

  /** 1. */
  readonly projectName: string;

  /** 1. */
  readonly projectDescription: string;

  /** 1. */
  readonly projectType: ProjectType;

  /** 1. */
  readonly projectStatus: ProjectStatus;

  /** 1. */
  readonly projectFiles: File;
};
