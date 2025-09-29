import { RegisterUserResult } from '../../application/dtos/register-user.result';
import { RegisterResponseDto } from '../dtos/register.response.dto';

export const toRegisterResponse = (
  r: RegisterUserResult
): RegisterResponseDto => ({
  id: r.id,
  email: r.email,
  name: r.name,
});
