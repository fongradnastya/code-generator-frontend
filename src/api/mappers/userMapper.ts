import { User } from 'src/models/user';

import { type UserDto } from '../dtos/userDto';

import { type IMapperFromDto } from './mappers';

/** User mapper. */
class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return new User({
      id: dto.id,
      name: dto.name,
      email: dto.email,
    });
  }
}

/** Instance of the user mapper. */
export const userMapper = new UserMapper();
