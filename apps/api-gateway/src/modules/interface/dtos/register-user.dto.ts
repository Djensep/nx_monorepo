import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty()
  email: string;

  // @Matches(/(?=.*[A-Z])/, {
  //   message: 'Пароль должен содержать хотя бы одну заглавную букву',
  // })
  // @Matches(/(?=.*\d)/, {
  //   message: 'Пароль должен содержать хотя бы одну цифру',
  // })
  // @Matches(/(?=.*[!@#$%^&*])/, {
  //   message: 'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*)',
  // })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(8, { message: 'Пароль должен быть минимум 8 символов' })
  @MaxLength(32, { message: 'Пароль не может быть длиннее 32 символов' })
  password: string;
}
