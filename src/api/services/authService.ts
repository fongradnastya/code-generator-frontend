import { type UserSecret } from 'src/models/userSecret';
import { type Login } from 'src/models/login';
import { type Registration } from 'src/models/registration';

import { isApiError } from 'src/utils/axiosErrorGuard';

import { http } from '../http';
import { type UserSecretDto } from '../dtos/userSecretDto';
import { userSecretMapper } from '../mappers/userSecretMapper';
import { AppErrorMapper } from '../mappers/appErrorMapper';
import { loginMapper } from '../mappers/loginMapper';
import { RegistrationMapper } from '../mappers/registrationMapper';

import { UserSecretStorageService } from './userSecretStorage';

/** Auth API. */
export namespace AuthService {

  const loginUrl = 'login/';
  const registerUrl = 'create-user/';

  /**
   * Logs a user in with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<UserSecret> {
    try {
      const loginDto = loginMapper.toDto(loginData);
      const { data: userSecretDto } = await http.post<UserSecretDto>(loginUrl, loginDto);

      const userSecret = userSecretMapper.fromDto(userSecretDto);

      await UserSecretStorageService.save(userSecret);

      return userSecret;
    } catch (error: unknown) {
      if (isApiError(error)) {
        const appError = AppErrorMapper.fromDtoWithValidationSupport(error, loginMapper);
        throw appError;
      }
      throw error;
    }
  }

  /**
   * Registers a new user with email and password.
   * @param registrationData Registration data.
   */
  export async function register(registrationData: Registration): Promise<void> {
    logout();
    const registrationDto = RegistrationMapper.toDto(registrationData);
    try {
      await http.post(registerUrl, registrationDto);
    } catch (error: unknown) {
      if (isApiError(error)) {
        const appError = AppErrorMapper.fromDtoWithValidationSupport(error, loginMapper);
        throw appError;
      }
      throw error;
    }
  }

  /**
   * Logs the current user out.
   */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }
}
