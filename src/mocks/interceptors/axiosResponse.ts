import { faker } from '@faker-js/faker';
import type { AxiosResponse } from 'axios';

import { buildAxiosConfigMock } from './axiosConfig';

/**
 * Builds axios response mock.
 * @param overrides Properties to override.
 */
export const buildAxiosResponseMock = (overrides?: Partial<AxiosResponse>): AxiosResponse => ({
  config: buildAxiosConfigMock(),
  data: faker.lorem.sentence(),
  status: faker.internet.httpStatusCode({ types: ['serverError'] }),
  statusText: faker.lorem.sentence(),
  request: faker.random.numeric(),
  headers: {},
  ...overrides,
});
