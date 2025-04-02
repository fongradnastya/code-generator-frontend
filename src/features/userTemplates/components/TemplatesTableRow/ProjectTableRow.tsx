import { type FC, memo } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { type Template } from 'src/models/template';

import styles from './TemplateTableRow.module.css';

type Props = {

  /** Template info. */
  readonly template: Template;

  /** Is row selected. */
  readonly isItemSelected: boolean;

  /** Rows label id. */
  readonly labelId: string;

  /** Handles on row click event. */
  readonly onRowClick: (id: string) => void;
};

const TemplateTableRowComponent: FC<Props> = ({
  template,
  isItemSelected,
  onRowClick,
}) => (
  <TableRow
    hover
    onClick={() => onRowClick(template.templateId)}
    role="checkbox"
    aria-checked={isItemSelected}
    tabIndex={-1}
    key={template.templateId}
    selected={isItemSelected}
    className={styles.tableRow}
  >
    <TableCell align="left">
      {template.templateName}
    </TableCell>
    <TableCell align="left">
      {template.creationDate.toISOString()}
    </TableCell>
    <TableCell align="left">
      {template.templateType}
    </TableCell>
    <TableCell align="left">
      {template.templateStatus}
    </TableCell>
  </TableRow>
);

/** Template table row component. */
export const TemplateTableRow = memo(TemplateTableRowComponent);
