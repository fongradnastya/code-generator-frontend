import { faker } from '@faker-js/faker';

import { extractErrorMessage } from './extractErrorMessage';

describe('extractErrorMessage', () => {

  it('returns `undefined` if error array is not defined', () => {
    expect(extractErrorMessage(undefined)).toBeUndefined();
  });

  it('returns `undefined` if error array is empty', () => {
    expect(extractErrorMessage([])).toBeUndefined();
  });

  it('returns error message in case message is defined and not empty', () => {
    const message = faker.datatype.array(10).map(v => v.toString());
    expect(extractErrorMessage(message)).toBe(message.join('\n'));
  });
});
