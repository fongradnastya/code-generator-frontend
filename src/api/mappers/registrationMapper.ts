import { type Registration } from '../../models/registration';
import { type RegistrationDto } from '../dtos/registrationDto';

export namespace RegistrationMapper {

  /**
   * 1.
   * @param model 1.
   */
  export function toDto(model: Registration): RegistrationDto {
    return {
      email: model.email,
      firstname: model.firstName,
      lastname: model.lastName,
      password: model.password,
    };
  }

  /**
   * 1.
   * @param dto 1.
   */
  export function fromDto(dto: RegistrationDto): Registration {
    return {
      email: dto.email,
      firstName: dto.firstname,
      lastName: dto.lastname,
      password: dto.password,
      passwordConfirm: dto.password,
    };
  }
}
