import { type FC, memo } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { type Project } from 'src/models/project';

import styles from './ProjectTableRow.module.css';

type Props = {

  /** Project info. */
  readonly project: Project;

  /** Is row selected. */
  readonly isItemSelected: boolean;

  /** Rows label id. */
  readonly labelId: string;

  /** Handles on row click event. */
  readonly onRowClick: (id: number) => void;
};

const ProjectTableRowComponent: FC<Props> = ({
  project,
  isItemSelected,
  labelId,
  onRowClick,
}) => (
  <TableRow
    hover
    onClick={() => onRowClick(project.id)}
    role="checkbox"
    aria-checked={isItemSelected}
    tabIndex={-1}
    key={project.id}
    selected={isItemSelected}
    className={styles.tableRow}
  >
    <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        checked={isItemSelected}
        inputProps={{
          'aria-labelledby': labelId,
        }}
      />
    </TableCell>
    <TableCell align="left">
      {project.projectName}
    </TableCell>
    <TableCell align="left">
      {project.creationDate.toISOString()}
    </TableCell>
    <TableCell align="left">
      {project.projectLanguage}
    </TableCell>
    <TableCell align="left">
      {project.projectType}
    </TableCell>
    <TableCell align="left">
      {project.status}
    </TableCell>
  </TableRow>
);

/** Project table row component. */
export const ProjectTableRow = memo(ProjectTableRowComponent);
