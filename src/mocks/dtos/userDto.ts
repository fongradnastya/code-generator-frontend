import { faker } from '@faker-js/faker';
import type { UserDto } from 'src/api/dtos/userDto';

/**
 * Build user DTO mock.
 * @param overrides Properties to override.
 */
export const buildUserDtoMock = (overrides?: Partial<UserDto>): UserDto => ({
  id: faker.datatype.number(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  ...overrides,
});
