import type { Login } from 'src/models/loginValues';
import { faker } from '@faker-js/faker';

/**
 * Builds login mock.
 * @param overrides Properties to override.
 */
export const buildLoginMock = (overrides?: Partial<Login>): Login => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
});
