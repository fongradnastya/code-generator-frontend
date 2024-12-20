import { type InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

import { CONFIG } from '../../config';

// TODO (template preparation): Update interceptor according to API specs.
/** Headers error message. */
export const HEADERS_ERROR_MESSAGE = 'Axios did not pass any header. Please check your request.';

/**
 * Checks if a request should be intercepted.
 * @param config - Request config.
 */
export function shouldInterceptSecret(config: InternalAxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}

/**
 * Get authorization header value from secret.
 * @param secret User secret.
 */
function getAuthorizationHeaderValue(secret: string): string {
  return `Bearer ${secret}`;
}

/**
 * Interceptor to append secret to requests.
 * @param config Axios config.
 * @param getSecret Callback to get secret.
 */
export async function addSecretBeforeRequest(
  config: InternalAxiosRequestConfig,
  getSecret: () => Promise<string | null>,
): Promise<InternalAxiosRequestConfig> {
  const secret = await getSecret();

  if (!shouldInterceptSecret(config) || secret == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error(HEADERS_ERROR_MESSAGE);
  }

  const axiosHeaders = new AxiosHeaders({
    ...headers,
    Authorization: getAuthorizationHeaderValue(secret),
  });

  return {
    ...config,
    headers: axiosHeaders,
  };
}
