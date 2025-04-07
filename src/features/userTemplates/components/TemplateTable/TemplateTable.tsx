import { type FC, useState, useCallback, useMemo, memo, type MouseEvent, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Order } from 'src/models/order';
import { type Template } from 'src/models/template';
import { type TableColumn } from 'src/models/tableColumn';
import { useNavigate } from 'react-router-dom';

import { getTemplatesComparator } from '../../utils/comparators';
import { TemplatesTableHead } from '../TemplatesTableHead';
import { TemplateTableRow } from '../TemplatesTableRow';

import styles from './TemplateTable.module.css';

const columns: readonly TableColumn<Template>[] = [
  {
    accessor: 'templateName',
    label: 'Template Name',
  },
  {
    accessor: 'creationDate',
    label: 'Creation Date',
  },
  {
    accessor: 'templateType',
    label: 'Type',
  },
  {
    accessor: 'templateStatus',
    label: 'Status',
  },
];

type Props = {

  /** Templates to be displayed. */
  readonly templates: readonly Template[];
};

const PAGE_SIZE_OPTIONS = [5, 10, 25];

const TemplateTableComponent: FC<Props> = ({ templates }) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(Order.Ascending);
  const [orderBy, setOrderBy] = useState<keyof Template>('templateId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE_OPTIONS[0]);

  const handleRowClick = (id: string) => {
    navigate(`/process/${id}`);
  };

  const handleRequestSort = useCallback((
    _event: MouseEvent<unknown>,
    property: keyof Template,
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
    () => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - templates.length) : 0,
    [page, templates.length, rowsPerPage],
  );

  const visibleRows = useMemo(
    () =>
      [...templates]
        .sort(getTemplatesComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, templates],
  );

  return (
    <Box className={styles.box}>
      <Paper className={styles.paper}>
        <TableContainer>
          <Table
            className={styles.table}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TemplatesTableHead
              tableColumns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TemplateTableRow
                  key={index}
                  template={row}
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
          rowsPerPageOptions={PAGE_SIZE_OPTIONS}
          component="div"
          count={templates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

/** Template table component. */
export const TemplateTable = memo(TemplateTableComponent);
