import { type UserSecret } from 'src/models/userSecret';

import { type UserSecretDto } from '../dtos/userSecretDto';

import { type IMapper } from './mappers';

/** User secret mapper. */
class UserSecretMapper implements IMapper<UserSecretDto, UserSecret> {

  /** @inheritdoc */
  public toDto(data: UserSecret): UserSecretDto {
    return {
      token: data.token,
    };
  }

  /** @inheritdoc */
  public fromDto(dto: UserSecretDto): UserSecret {
    return {
      token: dto.token,
    };
  }
}

/** Instance of the user secrets mapper. */
export const userSecretMapper = new UserSecretMapper();
