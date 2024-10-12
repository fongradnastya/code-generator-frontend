import '@testing-library/jest-dom';
import { server } from 'src/mocks/server/index';

// Jest can't work with import.meta.env, so we need to mock it
jest.mock('src/api/config.ts', () => ({
  CONFIG: {
    apiUrl: 'https://api.boilerpalte.saritasa.rocks',
  },
}));

// Enable API mocking before tests run.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
