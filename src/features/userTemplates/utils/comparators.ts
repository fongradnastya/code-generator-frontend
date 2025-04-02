import { type Template } from 'src/models/template';
import { Order } from 'src/models/order';

/**
 * Compares to objects in the descending order.
 * @param currentElement Current element to compare.
 * @param nextElement Next element to compare.
 * @param orderBy A field to compare objects by.
 */
export function descendingComparator<T extends Object>(
  currentElement: T,
  nextElement: T,
  orderBy: keyof T,
) {
  if (nextElement[orderBy] < currentElement[orderBy]) {
    return -1;
  }
  if (nextElement[orderBy] > currentElement[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Gets a template comparator method.
 * @param order Ascending or descending order.
 * @param orderBy A field name to order objects by.
 */
export function getTemplatesComparator<Key extends keyof Template>(
  order: Order,
  orderBy: Key,
): (
  firstElement: { [key in Key]: number | string | Date },
  secondElement: { [key in Key]: number | string | Date },
) => number {
  return order === Order.Descending ?
    (firstElement, secondElement) => descendingComparator(firstElement, secondElement, orderBy) :
    (firstElement, secondElement) => -descendingComparator(firstElement, secondElement, orderBy);
}
