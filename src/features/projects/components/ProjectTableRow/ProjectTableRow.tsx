import { type FC, memo } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { type ProjectInfo } from 'src/models/projectInfo';

import styles from './ProjectTableRow.module.css';

type Props = {

  /** 1. */
  readonly projectInfo: ProjectInfo;

  /** 1. */
  readonly isItemSelected: boolean;

  /** 1. */
  readonly labelId: string;

  /** 1. */
  readonly onRowClick: (id: number) => void;
};

const ProjectTableRowComponent: FC<Props> = ({
  projectInfo,
  isItemSelected,
  labelId,
  onRowClick,
}) => (
  <TableRow
    hover
    onClick={() => onRowClick(projectInfo.id)}
    role="checkbox"
    aria-checked={isItemSelected}
    tabIndex={-1}
    key={projectInfo.id}
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
    <TableCell
      component="th"
      id={labelId}
      scope="row"
      padding="none"
    >
      {projectInfo.name}
    </TableCell>
    <TableCell align="right">
      {projectInfo.calories}
    </TableCell>
    <TableCell align="right">
      {projectInfo.fat}
    </TableCell>
    <TableCell align="right">
      {projectInfo.carbs}
    </TableCell>
    <TableCell align="right">
      {projectInfo.protein}
    </TableCell>
  </TableRow>
);

/** Project table row component. */
export const ProjectTableRow = memo(ProjectTableRowComponent);
