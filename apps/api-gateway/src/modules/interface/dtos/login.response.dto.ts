export class LoginResponseDto {
  user: {
    id: number;
    email: string;
    name: string;
  };
  accessToken: string;
}
