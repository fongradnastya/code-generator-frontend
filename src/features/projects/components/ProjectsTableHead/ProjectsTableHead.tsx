import { type FC, memo, type MouseEvent, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { type Project } from 'src/models/project';
import { type Order } from 'src/models/order';
import { type TableColumn } from 'src/models/tableColumn';

type Props = {

  /** 1. */
  readonly tableColumns: readonly TableColumn<Project>[];

  /** 1. */
  readonly numSelected: number;

  /** 1. */
  readonly onRequestSort: (event: MouseEvent<unknown>, property: keyof Project) => void;

  /** 1. */
  readonly onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;

  /** 1. */
  readonly order: Order;

  /** 1. */
  readonly orderBy: string;

  /** 1. */
  readonly rowCount: number;
};

const ProjectsTableHeadComponent: FC<Props> = ({
  tableColumns,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler =
    (property: keyof Project) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {tableColumns.map(column => (
          <TableCell
            key={column.accessor}
            align={column.align}
            sortDirection={orderBy === column.accessor ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.accessor}
              direction={orderBy === column.accessor ? order : 'asc'}
              onClick={createSortHandler(column.accessor)}
            >
              {column.label}
              {orderBy === column.accessor ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

/** Projects table head component. */
export const ProjectsTableHead = memo(ProjectsTableHeadComponent);
