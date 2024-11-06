import { type FC, memo, type MouseEvent, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { type ProjectInfo } from 'src/models/projectInfo';
import { type Order } from 'src/models/order';

type HeadCell = {

  /** 1. */
  readonly disablePadding: boolean;

  /** 1. */
  readonly id: keyof ProjectInfo;

  /** 1. */
  readonly label: string;

  /** 1. */
  readonly numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

type Props = {

  /** 1. */
  readonly numSelected: number;

  /** 1. */
  readonly onRequestSort: (event: MouseEvent<unknown>, property: keyof ProjectInfo) => void;

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
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler =
    (property: keyof ProjectInfo) => (event: MouseEvent<unknown>) => {
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
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
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
