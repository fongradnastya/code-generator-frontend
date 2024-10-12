import type { UserSecretDto } from 'src/api/dtos/userSecretDto';
import { faker } from '@faker-js/faker';

/**
 * Build user secret DTO mock.
 * @param overrides Properties to override.
 */
export const buildUserSecretDtoMock = (overrides?: Partial<UserSecretDto>): UserSecretDto => ({
  token: faker.datatype.uuid(),
  ...overrides,
});
