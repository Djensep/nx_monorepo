import { LoginUserResult } from '../../application/dtos/login-user.result';
import { RegisterUserResult } from '../../application/dtos/register-user.result';
import { RegisterResponseDto } from '../dtos/register.response.dto';

export const toRegisterResponse = ({
  user,
  accessToken,
}: RegisterUserResult | LoginUserResult): RegisterResponseDto => ({
  user: {
    id: user.id,
    email: user.email,
    name: user.name,
  },
  accessToken: accessToken,
});
