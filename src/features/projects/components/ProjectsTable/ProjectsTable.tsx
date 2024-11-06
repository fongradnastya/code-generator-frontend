import { type FC, useState, useCallback, useMemo, memo, type MouseEvent, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { type ProjectInfo } from 'src/models/projectInfo';
import { Order } from 'src/models/order';

import { getProjectsComparator } from '../../utils/comparators';
import { ProjectTableToolbar } from '../ProjectTableToolbar';
import { ProjectsTableHead } from '../ProjectsTableHead';
import { ProjectTableRow } from '../ProjectTableRow';
import { useTableRowSelect } from '../../hooks/useTableRowSelect';

import styles from './ProjectTable.module.css';

type Props = {

  /** Projects info. */
  readonly projects: readonly ProjectInfo[];
};

const rowsPerPageOptions: readonly number[] = [5, 10, 15];

const ProjectTableComponent: FC<Props> = ({ projects }) => {
  const [order, setOrder] = useState(Order.Ascending);
  const [orderBy, setOrderBy] = useState<keyof ProjectInfo>('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const {
    selected,
    handleSelectAllClick,
    handleRowClick,
  } = useTableRowSelect(projects);

  const handleRequestSort = useCallback((
    _event: MouseEvent<unknown>,
    property: keyof ProjectInfo,
  ) => {
    const isAscending = orderBy === property && order === Order.Ascending;
    setOrder(isAscending ? Order.Descending : Order.Ascending);
    setOrderBy(property);
  }, [order, orderBy]);

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const emptyRows = useMemo(
    () => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0,
    [page, projects.length, rowsPerPage],
  );

  const visibleRows = useMemo(
    () =>
      [...projects]
        .sort(getProjectsComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, projects],
  );

  return (
    <Box className={styles.box}>
      <Paper className={styles.paper}>
        <ProjectTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={styles.table}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <ProjectsTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={projects.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <ProjectTableRow
                  key={index}
                  projectInfo={row}
                  isItemSelected={selected.includes(row.id)}
                  labelId={`table-checkbox-${index}`}
                  onRowClick={handleRowClick}
                />
              ))}
              {emptyRows > 0 && (
                <TableRow className={styles.emptyTableRow}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

/** Project table component. */
export const ProjectTable = memo(ProjectTableComponent);
