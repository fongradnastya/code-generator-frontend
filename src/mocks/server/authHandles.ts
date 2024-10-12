import { rest } from 'msw';
import type { LoginDto } from 'src/api/dtos/loginDto';
import type { UserDto } from 'src/api/dtos/userDto';
import type { ApiErrorDto } from 'src/api/dtos/validationErrorDto';
import type { UserSecretDto } from 'src/api/dtos/userSecretDto';

import { buildUserDtoMock } from '../dtos/userDto';
import { buildLoginDtoErrorMock } from '../dtos/loginDto';
import { buildUserSecretDtoMock } from '../dtos/userSecretDto';

import { getApiUrl } from './getApiUrl';

/** Auth handles. */
export const authHandles = [
  rest.post<LoginDto, {}, UserDto | ApiErrorDto<LoginDto>>(getApiUrl('auth/login/'), async(req, res, ctx) => {
    const { email, password } = await req.json<LoginDto>();

    if (password.length < 5) {
      return res(ctx.status(400), ctx.json(buildLoginDtoErrorMock()));
    }

    return res(ctx.json(
      buildUserDtoMock({ email }),
    ));
  }),

  rest.post<UserSecretDto, {}, UserSecretDto>(getApiUrl('auth/token/refresh/'), (req, res, ctx) =>
    (res(ctx.json(buildUserSecretDtoMock())))),
];
