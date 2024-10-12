import { extractErrorMessage } from 'src/utils/extractErrorMessage';
import { type EntityValidationErrors } from 'src/models/appError';
import { type Login } from 'src/models/loginValues';

import { type LoginDto } from '../dtos/loginDto';
import { type ValidationErrorDto } from '../dtos/validationErrorDto';

import { type IMapper, type ValidationErrorMapper } from './mappers';

/** Login mapper. */
class LoginMapper implements
  IMapper<LoginDto, Login>,
  ValidationErrorMapper<LoginDto, Login> {

  /** @inheritdoc */
  public fromDto(dto: LoginDto): Login {
    return {
      email: dto.email,
      password: dto.password,
    };
  }

  /** @inheritdoc */
  public toDto(data: Login): LoginDto {
    return {
      email: data.email,
      password: data.password,
    };
  }

  /** @inheritdoc */
  public validationErrorFromDto(
    errorDto?: ValidationErrorDto<LoginDto> | null,
  ): EntityValidationErrors<Login> {
    return {
      email: extractErrorMessage(errorDto?.email),
      password:
        extractErrorMessage(errorDto?.password) ??
        extractErrorMessage(errorDto?.non_field_errors),
    };
  }
}

/** Instance of the login mapper. */
export const loginMapper = new LoginMapper();
