import type { ApiErrorDto } from 'src/api/dtos/validationErrorDto';
import type { LoginDto } from 'src/api/dtos/loginDto';
import { faker } from '@faker-js/faker';

/** Error message for password length validation. */
export const MIN_PASSWORD_LENGTH_ERROR_MESSAGE = 'Minimum password length 5 characters';

/**
 * Builds login DTO mock.
 * @param overrides Properties to override.
 */
export const buildLoginDtoMock = (overrides?: Partial<LoginDto>): LoginDto => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
});

/**
 * Builds login DTO error mock.
 * @param overrides Properties to override.
 */
export const buildLoginDtoErrorMock = (overrides?: Partial<ApiErrorDto<LoginDto>>): ApiErrorDto<LoginDto> => ({
  data: {
    password: [MIN_PASSWORD_LENGTH_ERROR_MESSAGE],
    ...overrides?.data,
  },
  detail: 'Incorrect password',
  ...overrides,
});
