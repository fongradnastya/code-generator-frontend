import { type UserProfile } from 'src/models/userProfile';

import { type UserProfileDto } from '../dtos/userProfileDto';

export namespace UserProfileMapper {

  /**
   * 1.
   * @param model 1.
   */
  export function toDto(model: UserProfile): UserProfileDto {
    return {
      email: model.email,
    };
  }

  /**
   * 1.
   * @param dto 1.
   */
  export function fromDto(dto: UserProfileDto): UserProfile {
    return {
      email: dto.email,
    };
  }
}
