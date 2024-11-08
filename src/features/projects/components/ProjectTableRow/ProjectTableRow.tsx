import { type FC, memo } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { type TableColumn } from 'src/models/tableColumn';
import { type Project } from 'src/models/project';

import styles from './ProjectTableRow.module.css';

type Props = {

  /** 1. */
  readonly tableColumns: readonly TableColumn<Project>[];

  /** 1. */
  readonly project: Project;

  /** 1. */
  readonly isItemSelected: boolean;

  /** 1. */
  readonly labelId: string;

  /** 1. */
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
