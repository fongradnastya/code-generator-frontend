import { type FC, memo } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { type Template } from 'src/models/template';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';

import styles from './TemplateTableRow.module.css';

type Props = {

  /** Template info. */
  readonly template: Template;

  /** Rows label id. */
  readonly labelId: string;

  /** Handles on row click event. */
  readonly onRowClick: (id: string) => void;
};

const TemplateTableRowComponent: FC<Props> = ({
  template,
  onRowClick,
}) => (
  <TableRow
    hover
    onClick={() => onRowClick(template.templateId)}
    role="checkbox"
    tabIndex={-1}
    key={template.templateId}
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
    <TableCell align="left">
      <IconButton aria-label="download" color="primary">
        <DownloadIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

/** Template table row component. */
export const TemplateTableRow = memo(TemplateTableRowComponent);
