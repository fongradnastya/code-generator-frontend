/** Represents a table column. */
export type TableColumn<T> = {

  /** Accessor value. */
  readonly accessor: keyof T;

  /**  The text to display as the column header. */
  readonly label: string;

  /** The minimum width of the column. */
  readonly minWidth?: number;

  /** The horizontal alignment of the cell contents. */
  readonly align?: 'right' | 'left' | 'center';

  /** The format function to use to render the cell value. */
  readonly toReadable?: (value: T[keyof T]) => string;
};
