import { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

import { faker } from '@faker-js/faker';

/**
 * Builds axios config mock.
 * @param overrides Properties to override.
 */
export const buildAxiosConfigMock = (overrides?: Partial<InternalAxiosRequestConfig>): InternalAxiosRequestConfig => {
  const axiosHeaders = new AxiosHeaders({
    Authorization: 'Bearer fake_token',
  });

  return {
    baseURL: faker.internet.url(),
    headers: axiosHeaders,
    ...overrides,
  };
};
