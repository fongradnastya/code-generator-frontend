import axios, { type AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addSecretBeforeRequest } from './interceptors/addSecretBeforeRequest';
import { UserSecretStorageService } from './services/userSecretStorage';

/** Instance of http Axios. */
export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

const getSecret = async(): Promise<string | null> => {
  const secret = await UserSecretStorageService.get();
  return secret?.token ?? null;
};

http.interceptors.request.use(config => addSecretBeforeRequest(config, getSecret));
