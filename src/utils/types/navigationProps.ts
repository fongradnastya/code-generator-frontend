import { type SvgIconComponent } from '@mui/icons-material';

/** Represents navigation properties. */
export type NavigationProps = {

  /** Route name. */
  readonly name: string;

  /** 1. */
  readonly icon: SvgIconComponent;

  /** Route path. */
  readonly path: string;
};
