export interface RegisterUserResult {
  user: {
    id: number;
    email: string;
    name: string;
  };
  refreshToken?: string;
  accessToken: string;
}
