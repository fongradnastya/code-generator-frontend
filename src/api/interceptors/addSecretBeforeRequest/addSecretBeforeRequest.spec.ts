import { AxiosHeaders } from 'axios';

import { CONFIG } from 'src/api/config';
import { buildAxiosConfigMock } from 'src/mocks/interceptors/axiosConfig';

import { faker } from '@faker-js/faker';

import { HEADERS_ERROR_MESSAGE, addSecretBeforeRequest } from './addSecretBeforeRequest';

describe('addSecretBeforeRequest', () => {

  let mockGetSecret = jest.fn();

  it('returns initial config if request should not be intercepted', async() => {
    const config = buildAxiosConfigMock();
    expect(await addSecretBeforeRequest(config, mockGetSecret)).toStrictEqual(config);
  });

  it('returns initial config if there is no secret', async() => {
    mockGetSecret = jest.fn().mockResolvedValueOnce(null);
    const config = buildAxiosConfigMock({ baseURL: CONFIG.apiUrl });
    expect(await addSecretBeforeRequest(config, mockGetSecret)).toStrictEqual(config);
  });

  it('throws error if there are no headers', async() => {
    mockGetSecret = jest.fn().mockResolvedValueOnce(faker.datatype.uuid());
    const config = buildAxiosConfigMock({ baseURL: CONFIG.apiUrl, headers: undefined });
    await expect(addSecretBeforeRequest(config, mockGetSecret)).rejects.toThrow(HEADERS_ERROR_MESSAGE);
  });

  it('returns config with authorization header', async() => {
    const secret = faker.datatype.uuid();
    mockGetSecret = jest.fn().mockResolvedValueOnce(secret);
    const config = buildAxiosConfigMock({ baseURL: CONFIG.apiUrl, headers: new AxiosHeaders() });
    const result = await addSecretBeforeRequest(config, mockGetSecret);
    expect(result.headers?.Authorization).toBe(`Bearer ${secret}`);
  });
});
