import { type ProjectType } from './projectType';

/** 1. */
export type ProjectMetadata = {

  /** 1. */
  readonly id: number;

  /** 1. */
  readonly projectName: string;

  /** 1. */
  readonly projectDescription: string;

  /** 1. */
  readonly projectType: ProjectType;

  /** 1. */
  readonly projectFiles: File;
};
