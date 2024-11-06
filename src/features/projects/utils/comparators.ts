import { type ProjectInfo } from 'src/models/projectInfo';
import { Order } from 'src/models/order';

/**
 * 1.
 * @param a 1.
 * @param b 1.
 * @param orderBy 1.
 */
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * 1.
 * @param order 1.
 * @param orderBy 1.
 */
export function getProjectsComparator<Key extends keyof ProjectInfo>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === Order.Descending ?
    (a, b) => descendingComparator(a, b, orderBy) :
    (a, b) => -descendingComparator(a, b, orderBy);
}
