import { setupServer } from 'msw/node';

import { authHandles } from './authHandles';

/** Server instance. */
export const server = setupServer(...authHandles);

export * from 'msw';
