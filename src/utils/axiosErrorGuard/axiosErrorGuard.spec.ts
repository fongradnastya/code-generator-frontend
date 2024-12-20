import { isApiError } from './axiosErrorGuard';

describe('axiosErrorGuard', () => {

  it('passes guard with object that has isAxiosError property set to `true`', () => {
    expect(isApiError({ isAxiosError: true })).toBeTruthy();
  });

  it('fails guard with object that has isAxiosError property set to `false`', () => {
    expect(isApiError({ isAxiosError: false })).toBeFalsy();
  });

  it('fails guard with object that does not have isAxiosError property', () => {
    expect(isApiError({})).toBeFalsy();
  });
});
