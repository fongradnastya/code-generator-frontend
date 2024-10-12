import { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';

import { buildAxiosConfigMock } from './axiosConfig';

type AxiosErrorParams<T, D> = {

  /** Error message. */
  readonly message?: string;

  /** Error code. */
  readonly code?: string;

  /** Axios config. */
  readonly config: InternalAxiosRequestConfig<D>;

  /** Request. */
  readonly request?: unknown;

  /** Axios response. */
  readonly response?: AxiosResponse<T, D>;
};

/**
 * Builds axios error mock.
 * @param overrides Parameters to override.
 */
export const buildAxiosErrorMock = <T, D>(overrides?: Partial<AxiosErrorParams<T, D>>): AxiosError => new AxiosError(
  overrides?.message ?? faker.lorem.sentence(),
  overrides?.code ?? faker.lorem.word(),
  overrides?.config ?? buildAxiosConfigMock(),
  overrides?.request ?? undefined,
  overrides?.response ?? undefined,
);
