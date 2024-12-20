import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addSecretBeforeRequest } from './interceptors/addSecretBeforeRequest';
import { type SecretRefreshResult, refreshSecret } from './interceptors/refreshSecret';
import { AuthApi } from './services/authApi';
import { UserSecretStorageService } from './services/userSecretStorage';

/** Instance of http Axios. */
export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

/**
 * Axios interceptors work like a stack (LIFO queue).
 * So you can add multiple interceptors like this:
 * ```js
 * http.interceptors.request.use(addTokenBeforeRequest);
 * http.interceptors.request.use(requestLogger);
 * ```
 * In this example request will be intercepted in the following order:
 * requestLogger -> addTokenBeforeRequest.
 *
 * Learn more in Axios docs: https://axios-http.com/docs/interceptors.
 */

// TODO (template preparation): Add necessary HTTP request interceptors.

const getSecret = async(): Promise<string | null> => {
  const secret = await UserSecretStorageService.get();
  return secret?.token ?? null;
};

http.interceptors.request.use(config => addSecretBeforeRequest(config, getSecret));

const handleSecretRefresh = async(error: AxiosError): SecretRefreshResult => {
  const secret = await UserSecretStorageService.get();

  if (secret == null || error.config == null) {
    throw error;
  }

  try {
    const newSecret = await AuthApi.refreshSecret(secret);
    await UserSecretStorageService.save(newSecret);
    return http.request(error.config);
  } catch (err: unknown) {
    await UserSecretStorageService.remove();
    throw err;
  }
};

http.interceptors.response.use(
  config => config,
  error => refreshSecret(error, () => handleSecretRefresh(error)),
);
