import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addSecretBeforeRequest } from './interceptors/addSecretBeforeRequest';
import { type SecretRefreshResult, refreshSecret } from './interceptors/refreshSecret';
import { AuthService } from './services/authService';
import { UserSecretStorageService } from './services/userSecretStorage';

/** Instance of http Axios. */
export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

const getSecret = async(): Promise<string | null> => {
  const secret = await UserSecretStorageService.get();
  console.log(secret?.token);
  return secret?.token ?? null;
};

http.interceptors.request.use(config => addSecretBeforeRequest(config, getSecret));

const handleSecretRefresh = async(error: AxiosError): SecretRefreshResult => {
  const secret = await UserSecretStorageService.get();

  if (secret == null || error.config == null) {
    throw error;
  }

  try {
    const newSecret = await AuthService.refreshSecret(secret);
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
