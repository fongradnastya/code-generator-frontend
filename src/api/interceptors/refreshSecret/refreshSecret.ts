import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { CONFIG } from 'src/api/config';

/** Secret refresh result type. */
export type SecretRefreshResult = Promise<AxiosResponse<unknown, unknown>>;

/**
 * Refresh secret interceptor.
 * @param error Server error.
 * @param refreshCallback Callback to refresh secret.
 */
export async function refreshSecret(
  error: AxiosError,
  refreshCallback: () => SecretRefreshResult,
): SecretRefreshResult {

  if (
    error.config == null ||
    !shouldRefreshSecretForUrl(error.config) ||
    (error.response != null && error.response.status !== 401)
  ) {
    throw error;
  }

  const result = await refreshCallback();
  return result;
}

/**
 * Checks if a request should be intercepted.
 * @param config Request config.
 */
export function shouldRefreshSecretForUrl(config: InternalAxiosRequestConfig): boolean {
  const { url, baseURL } = config;

  if (url == null || baseURL == null) {
    return false;
  }

  const fullUrl = `${baseURL}${url}`;
  const homeUrl = new URL('', CONFIG.apiUrl).toString();

  const isHomeRequest = fullUrl.startsWith(homeUrl);
  const isAuthRequest = fullUrl.startsWith(new URL('auth', homeUrl).toString());

  return isHomeRequest && !isAuthRequest;
}
