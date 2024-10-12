import { CONFIG } from 'src/api/config';

/**
 * Since we can't configure MSW to use baseURL as axios do, we have to create our own function.
 * See more about the topic here: https://github.com/mswjs/msw/issues/397.
 * @param path Path.
 */
export const getApiUrl = (path: string) => new URL(path, CONFIG.apiUrl).toString();
