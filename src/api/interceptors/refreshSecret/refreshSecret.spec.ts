import { faker } from '@faker-js/faker';
import { buildAxiosConfigMock } from 'src/mocks/interceptors/axiosConfig';
import { buildAxiosErrorMock } from 'src/mocks/interceptors/axiosError';

import { CONFIG } from 'src/api/config';
import { buildAxiosResponseMock } from 'src/mocks/interceptors/axiosResponse';

import { refreshSecret } from './refreshSecret';

describe('refreshSecret', () => {

  const mockHandler = jest.fn();

  it('throws error if there is no user secret', async() => {
    const error = buildAxiosErrorMock();
    await expect(refreshSecret(error, mockHandler)).rejects.toThrow(error);
  });

  it('throws error if there is no config', async() => {
    const error = buildAxiosErrorMock({ config: undefined });
    await expect(refreshSecret(error, mockHandler)).rejects.toThrow(error);
  });

  it('throws error if there is no base URL', async() => {
    const error = buildAxiosErrorMock({ config: buildAxiosConfigMock({ baseURL: undefined }) });
    await expect(refreshSecret(error, mockHandler)).rejects.toThrow(error);
  });

  it('throws error if base URL is not related to the project', async() => {
    const error = buildAxiosErrorMock({ config: buildAxiosConfigMock({ baseURL: faker.internet.url() }) });
    await expect(refreshSecret(error, mockHandler)).rejects.toThrow(error);
  });

  it('throws error if there is no URL provided to the request', async() => {
    const error = buildAxiosErrorMock({ config: buildAxiosConfigMock({ baseURL: CONFIG.apiUrl, url: undefined }) });
    await expect(refreshSecret(error, mockHandler)).rejects.toThrow(error);
  });

  it('throws error if response status is not 401', async() => {
    const error = buildAxiosErrorMock({
      config: buildAxiosConfigMock({ baseURL: CONFIG.apiUrl }),
      response: buildAxiosResponseMock({ status: 400 }),
    });
    await expect(refreshSecret(error, mockHandler)).rejects.toThrow(error);
  });

  it('calls handler and returns response', async() => {
    const error = buildAxiosErrorMock({
      config: buildAxiosConfigMock({ baseURL: CONFIG.apiUrl, url: '/' }),
      response: buildAxiosResponseMock({ status: 401 }),
    });
    await refreshSecret(error, mockHandler);
    expect(mockHandler).toHaveBeenCalled();
  });
});
