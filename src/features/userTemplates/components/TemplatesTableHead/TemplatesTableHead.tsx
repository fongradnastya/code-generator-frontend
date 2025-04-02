import { type FC, memo, type MouseEvent, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { type Template } from 'src/models/template';
import { type Order } from 'src/models/order';
import { type TableColumn } from 'src/models/tableColumn';

type Props = {

  /** Table columns. */
  readonly tableColumns: readonly TableColumn<Template>[];

  /** Number of selected rows. */
  readonly numSelected: number;

  /** Handles sort requests. */
  readonly onRequestSort: (event: MouseEvent<unknown>, property: keyof Template) => void;

  /** Handles select all clicks. */
  readonly onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;

  /** Tables order. */
  readonly order: Order;

  /** Column that table is ordered by. */
  readonly orderBy: string;

  /** Rows number. */
  readonly rowCount: number;
};

const TemplatesTableHeadComponent: FC<Props> = ({
  tableColumns,
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler =
    (property: keyof Template) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {tableColumns.map(column => (
          <TableCell
            key={column.accessor}
            align={column.align}
            sortDirection={orderBy === column.accessor ? order : false}
          >
            <TableSortLabel
              sx={{ fontWeight: 600, color: '#555' }}
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

/** Templates table head component. */
export const TemplatesTableHead = memo(TemplatesTableHeadComponent);
