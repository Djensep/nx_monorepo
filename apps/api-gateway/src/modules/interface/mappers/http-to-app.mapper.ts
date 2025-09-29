import { RegisterUserInput } from '../../application/dtos/register-user.input';
import { RegisterRequestDto } from '../dtos/register.request.dto';

export const toRegisterInput = (
  dto: RegisterRequestDto
): RegisterUserInput => ({
  email: dto.email,
  name: dto.name,
  password: dto.password,
});
